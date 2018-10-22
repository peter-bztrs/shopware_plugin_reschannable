Ext.define('Shopware.apps.ReschannableArticles.model.ProductAssignment', {

    /**
     * Extends the standard Ext Model
     * @string
     */
    extend:'Ext.data.Model',
    /**
     * Configure the data communication
     * @object
     */
    fields:[
        { name: 'articleId', type: 'integer' },
        { name: 'name', type: 'string' },
        { name: 'number', type: 'string' },
        { name: 'supplierName', type: 'string' }
    ]
});
