{block name="backend/base/header/css"}
    {$smarty.block.parent}
    <link rel="stylesheet" type="text/css" href="{link file='backend/_resources/css/custom.css'}?{Shopware::REVISION}"/>
{/block}