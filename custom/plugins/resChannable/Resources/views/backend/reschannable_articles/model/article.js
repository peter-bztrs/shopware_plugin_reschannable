//{block name="backend/reschannablearticles/model/article"}
Ext.define('Shopware.apps.ReschannableArticles.model.Article', {

    /**
     * Extends the standard Ext Model
     * @string
     */
    extend:'Shopware.apps.Base.model.Article',

    proxy : {
        type : 'ajax',

        /**
         * Configure the url mapping for the different
         * store operations based on
         * @object
         */
        api : {
            read : '{url controller=ReschannableArticles action=getArticle}',
            create  : '{url controller=ReschannableArticles action=createArticle}',
            update  : '{url controller=ReschannableArticles action=updateArticle}'

        },
        /**
         * Configure the data reader
         * @object
         */
        reader : {
            type : 'json',
            root: 'data'
        }
    },

});
//{/block}
