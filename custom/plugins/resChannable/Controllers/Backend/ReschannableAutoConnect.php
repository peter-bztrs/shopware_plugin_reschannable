<?php

use Shopware\Models\User\User;

class Shopware_Controllers_Backend_ReschannableAutoConnect extends Enlight_Controller_Action
{

    public function indexAction()
    {
        die('');
    }

    public function getUrlAction()
    {

        /** @var User $user */
        $user = Shopware()->Models()->getRepository('Shopware\Models\User\User');
        $user = $user->findOneBy(array('username' => 'ChannableApiUser'));

        if ( !$user ) {

            $this->View()->assign([
                'success' => false,
                'message' => 'Api user not found.'
            ]);

            die();
        }

        $sApiKey = $user->getApiKey();

        $baseUrl = $this->getBasePath();

        $shopUrl = urlencode($baseUrl.'api/resChannableApi?fnc=getarticles');

        $url = Shopware()->Snippets()->getNamespace('api/resChannable')->get(
            'autoConnectUrl'
        ) . '?url='.$shopUrl.'&api_key='.$sApiKey;

        echo json_encode(array('url' => $url));

        /*$this->View()->assign([
            'success' => true,
            'url' => $url
        ]);*/

    }

    private function getBasePath()
    {
        $url = $this->Request()->getBaseUrl() . '/';
        $uri = $this->Request()->getScheme() . '://' . $this->Request()->getHttpHost();
        $url = $uri . $url;

        return $url;
    }


}