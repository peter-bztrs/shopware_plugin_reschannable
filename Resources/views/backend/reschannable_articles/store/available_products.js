Ext.define('Shopware.apps.ReschannableArticles.store.AvailableProducts', {

    /**
     * Extend for the standard ExtJS 4
     * @string
     */
    extend: 'Ext.data.Store',

    /**
     * Truthy to filter on the server side, otherwise falsy to filter on the client side.
     * @boolean
     */
    remoteFilter: true,

    /**
     * Auto load the store after the component
     * is initialized
     * @boolean
     */
    autoLoad : false,

    /**
     * Define the used model for this store
     * @string
     */
    model : 'Shopware.apps.ReschannableArticles.model.ProductAssignment',

    /**
     * Batch size
     * @integer
     */
    pageSize: 20,

    /**
     * Configure the data communication
     * @object
     */
    proxy: {
        type: 'ajax',

        /**
         * Configure the url mapping for the different
         * store operations based on
         * @object
         */
        url: '{url controller="ReschannableArticles" action="getArticles"}',

        /**
         * Configure the data reader
         * @object
         */
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});
