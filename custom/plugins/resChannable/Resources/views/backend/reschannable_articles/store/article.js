//{block name="backend/reschannablearticles/store/article"}
Ext.define('Shopware.apps.ReschannableArticles.store.Article', {
    /**
     * Extend for the standard ExtJS 4
     * @string
     */
    extend:'Ext.data.Store',
    /**
     * Auto load the store after the component
     * is initialized
     * @boolean
     */
    autoLoad:false,

    /**
     * to upload all selected items in one request
     * @boolean
     */
    batch:true,
    /**
     * Define the used model for this store
     * @string
     */
    model:'Shopware.apps.ReschannableArticles.model.Article'
});
//{/block}
