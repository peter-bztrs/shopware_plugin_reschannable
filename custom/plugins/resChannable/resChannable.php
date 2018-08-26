<?php

namespace resChannable;

use Doctrine\ORM\Tools\SchemaTool;
use Shopware\Components\Plugin;
use Shopware\Components\Plugin\Context\InstallContext;
use Shopware\Components\Plugin\Context\UpdateContext;
use Shopware\Models\User\User;

class resChannable extends Plugin
{

    /**
    * {@inheritdoc}
    */
    public static function getSubscribedEvents()
    {
        return [
            'Enlight_Controller_Action_PreDispatch' => 'addTemplateDir',
        ];
    }

    public function addTemplateDir(\Enlight_Controller_ActionEventArgs $args)
    {
        $args->getSubject()->View()->addTemplateDir($this->getPath() . '/Resources/views');
    }

    public function install(InstallContext $context)
    {
        $this->createApiUser();

        $this->createSchema();
    }

    public function update(UpdateContext $context)
    {
        // todo: update schema / models

    }

    private function createSchema()
    {
        $tool = new SchemaTool($this->container->get('models'));
        $classes = $this->getModelMetaData();

        try {

            $tool->createSchema($classes);

        } catch ( \Exception $exception ) {
        }
    }

    /**
     * @return array
     */
    private function getModelMetaData()
    {
        return [$this->container->get('models')->getClassMetadata(Models\resChannableArticle\resChannableArticle::class)];
    }

    private function createApiUser()
    {

        $apiKey = $this->getGeneratedApiKey(40);

        $mail = Shopware()->Config()->get('mail');

        $password = $this->getGeneratedPassword(12);

        /** @var User $user */
        $user = Shopware()->Models()->getRepository('Shopware\Models\User\User');
        $user = $user->findOneBy(array('username' => 'ChannableApiUser'));

        if (!$user) {

            $user = new User();
            $user->setUsername('ChannableApiUser');
            $user->setName('Channable API User');
            $user->setActive(true);
            $user->setRoleId(1);
            $user->setLocaleId(1);
            $user->setEncoder('bcrypt');
            $user->setApiKey($apiKey);
            $user->setEmail($mail);
            $user->setPassword($password);
            $user->setDisabledCache(true);

            Shopware()->Models()->persist($user);
            Shopware()->Models()->flush();
        }

    }


    /**
     * Generates api key for user creation
     *
     * @param int $length
     * @return string
     */
    private function getGeneratedApiKey($length) {

        $chars = '0123456789';
        $chars .= 'abcdefghijklmnopqrstuvwxyz';
        $chars .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        $key = '';
        $length = strlen($chars);
        for ($i=0; $i<$length; $i++) {
            $key .= $chars[rand(0,$length-1)];
        }
        return $key;
    }

    private function getGeneratedPassword($length)
    {
        $chars = '0123456789';
        $chars .= 'abcdefghijklmnopqrstuvwxyz';
        $chars .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $chars .= '?!.$%-';

        $key = '';
        $length = strlen($chars);
        for ($i=0; $i<$length; $i++) {
            $key .= $chars[rand(0,$length-1)];
        }
        return $key;
    }

}




