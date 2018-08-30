<?php

namespace resChannable\Components\Api\Resource;

use Shopware\Components\Api\Resource\Resource;
use Shopware\Components\Model\QueryBuilder;

class ResChannableArticle extends Resource
{

    /**
     * @param $offset
     * @param $limit
     * @param $filter
     * @param $sort
     *
     * @return array
     */
    public function getList($offset, $limit, $filter, $sort)
    {
        $this->checkPrivilege('read');

        $builder = $this->getBaseQuery();
        $builder = $this->addQueryLimit($builder, $offset, $limit);

        if (!empty($filter)) {
            $builder->addFilter($filter);
        }
        if (!empty($sort)) {
            $builder->addOrderBy($sort);
        }

        $query = $builder->getQuery();

        $query->setHydrationMode($this->getResultMode());

        $paginator = $this->getManager()->createPaginator($query);
        $totalResult = $paginator->count();
        $articles = $paginator->getIterator()->getArrayCopy();

        return ['data' => $articles, 'total' => $totalResult];
    }

    /**
     * @param QueryBuilder $builder
     * @param              $offset
     * @param null         $limit
     *
     * @return QueryBuilder
     */
    protected function addQueryLimit(QueryBuilder $builder, $offset, $limit = null)
    {
        $builder->setFirstResult($offset)
            ->setMaxResults($limit);

        return $builder;
    }

    /**
     * @return \Doctrine\ORM\QueryBuilder|QueryBuilder
     */
    protected function getBaseQuery()
    {
        $builder = $this->getManager()->createQueryBuilder();

        $builder->select([
            'ChannableArticle',
            'article',
            'detail',
            'detailPrices',
            'tax',
            'propertyValues',
            'propertyOption',
            'configuratorOptions',
            'supplier',
            'priceCustomGroup',
            'detailAttribute',
            'propertyGroup',
            'customerGroups',
            'detailUnit'
        ])
        ->from('resChannable\Models\resChannableArticle\resChannableArticle', 'ChannableArticle')
        ->join('ChannableArticle.detail', 'detail')
        ->join('detail.article', 'article')
        ->leftJoin('detail.prices', 'detailPrices')
        ->leftJoin('detailPrices.customerGroup', 'priceCustomGroup')
        ->leftJoin('article.tax', 'tax')
        ->leftJoin('article.propertyValues', 'propertyValues')
        ->leftJoin('propertyValues.option', 'propertyOption')
        ->leftJoin('article.supplier', 'supplier')
        ->leftJoin('detail.attribute', 'detailAttribute')
        ->leftJoin('detail.configuratorOptions', 'configuratorOptions')
        ->leftJoin('article.propertyGroup', 'propertyGroup')
        ->leftJoin('article.customerGroups', 'customerGroups')
        ->leftJoin('detail.unit', 'detailUnit')
        ;

        return $builder;
    }

    /**
     * Helper function to prevent duplicate source code
     * to get the full query builder result for the current resource result mode
     * using the query paginator.
     *
     * @param QueryBuilder $builder
     *
     * @return array
     */
    private function getFullResult(QueryBuilder $builder)
    {
        $query = $builder->getQuery();
        $query->setHydrationMode($this->getResultMode());
        $paginator = $this->getManager()->createPaginator($query);

        return $paginator->getIterator()->getArrayCopy();
    }

    /**
     * Selects all images of the main variant of the passed article id.
     * The images are sorted by their position value.
     *
     * @param $articleId
     *
     * @return array
     */
    public function getArticleImages($articleId)
    {
        $builder = $this->getManager()->createQueryBuilder();
        $builder->select(['images'])
            ->from('Shopware\Models\Article\Image', 'images')
            ->innerJoin('images.article', 'article')
            ->where('article.id = :articleId')
            ->orderBy('images.position', 'ASC')
            ->andWhere('images.parentId IS NULL')
            ->setParameters(['articleId' => $articleId]);

        return $this->getFullResult($builder);
    }

    /**
     * Helper function which selects all categories of the passed
     * article id.
     * This function returns only the directly assigned categories.
     * To prevent a big data, this function selects only the category name and id.
     *
     * @param $articleId
     *
     * @return array
     */
    public function getArticleCategories($articleId)
    {
        $builder = $this->getManager()->createQueryBuilder();
        $builder->select(['categories.id', 'categories.name'])
            ->from('Shopware\Models\Category\Category', 'categories')
            ->innerJoin('categories.articles', 'articles')
            ->where('articles.id = :articleId')
            ->setParameter('articleId', $articleId);

        return $this->getFullResult($builder);
    }

    public function getArticleSeoUrl($articleId)
    {
        $connection = Shopware()->Container()->get('dbal_connection');

        $url = $connection->fetchColumn("SELECT path FROM `s_core_rewrite_urls` WHERE main=1 AND subshopID=1 AND org_path=?", ['sViewport=detail&sArticle='.$articleId]);

        return $url;
    }

}
