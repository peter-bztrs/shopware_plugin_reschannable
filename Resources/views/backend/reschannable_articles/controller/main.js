/* {namespace name=backend/reschannable_articles/controller/main} */

//{block name="backend/reschannable_articles/controller/main"}
Ext.define('Shopware.apps.ReschannableArticles.controller.Main', {
    /**
     * Extend from the standard ExtJS 4 controller
     * @string
     */
    extend: 'Ext.app.Controller',

    /**
     * Contains the main window of this sub-application.
     * @object
     */
    mainWindow: null,

    /**
     * Define references for the different parts of our application. The
     * references are parsed by ExtJS and Getter methods are automatically created.
     *
     * @array
     */
    refs: [
        { ref: 'articleMappingTab', selector: 'reschannablearticles-articles-tabs-article_mapping' }
    ],

    /**
     * Default root node ID
     * @integer
     */
    defaultRootNodeId : 1,

    /**
     * Creates the necessary event listener for this
     * specific controller and opens a new Ext.window.Window
     * to display the subapplication
     *
     * @return void
     */
    init: function() {
        var me = this;

        me.subApplication.defaultRootNodeId = me.defaultRootNodeId;

        me.subApplication.articleStore =  me.subApplication.getStore('Article');

        // Stores for the product assignment
        me.subApplication.availableProductsStore = me.subApplication.getStore('AvailableProducts');
        me.subApplication.assignedProductsStore = me.subApplication.getStore('AssignedProducts');

        me.mainWindow = me.getView('main.Window').create({
            availableProductsStore:me.subApplication.availableProductsStore,
            assignedProductsStore:me.subApplication.assignedProductsStore
        });

        /*me.subApplication.treeStore.getProxy().extraParams = {
            node:me.defaultRootNodeId
        };

        me.control({
            // Save button
            'reschannablearticles-main-window':{
                'saveDetail' : me.onSaveSettings
            }
        });*/
    },

    /**
     * Event listener method which will be fired when the user
     * clicks the "save"-button in every window.
     *
     * @param [object] btn - pressed Ext.button.Button
     * @event click
     * @return void
     */
    /*onSaveSettings: function (button, event) {
        var me = this,
            form = me.getSettingsForm().getForm(),
            categoryModel = form.getRecord(),
            selectedNode = me.getController("Tree").getSelectedNode(),
            parentNode = selectedNode.parentNode || selectedNode;

        form.updateRecord(categoryModel);
        if (form.isValid()) {
            categoryModel.save({
                callback:function (self, operation) {
                    if (operation.success) {
                        me.getSettingsForm().attributeForm.saveAttribute(categoryModel.get('id'));

                        Shopware.Notification.createGrowlMessage('', me.snippets.onSaveChangesSuccess, me.snippets.growlMessage);
                        me.subApplication.treeStore.load({ node: parentNode });
                    } else {
                        var rawData = self.proxy.reader.rawData;
                        if (rawData.message) {
                            Shopware.Notification.createGrowlMessage('',me.snippets.onSaveChangesError + '<br>' +  rawData.message, me.snippets.growlMessage);
                        } else {
                            Shopware.Notification.createGrowlMessage('', me.snippets.onSaveChangesError, me.snippets.growlMessage);
                        }
                    }
                }
            });
        }
    }*/
});
//{/block}
