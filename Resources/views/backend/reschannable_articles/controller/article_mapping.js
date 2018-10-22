/* {namespace name=backend/reschannable_articles/controller/article_mapping} */

//{block name="backend/reschannable_articles/controller/article_mapping"}
Ext.define('Shopware.apps.ReschannableArticles.controller.ArticleMapping', {
    /**
     * Extend from the standard ExtJS 4 controller
     * @string
     */
    extend: 'Ext.app.Controller',
    /**
     * Define references for the different parts of our application. The
     * references are parsed by ExtJS and Getter methods are automatically created.
     *
     * @array
     */
    refs: [
        { ref: 'articleMappingView', selector: 'reschannablearticles-articles-tabs-article_mapping' },
        { ref: 'addButton', selector: 'reschannablearticles-articles-tabs-article_mapping button[action=add]' },
        { ref: 'removeButton', selector: 'reschannablearticles-articles-tabs-article_mapping button[action=remove]' }
    ],

    /**
     * Initializies the necessary event listener for the controller.
     *
     * @returns { Void }
     */
    init: function() {
        var me = this;

        me.control({
            'reschannablearticles-articles-tabs-article_mapping': {
                'search': me.onSearch,
                'add': me.onAddProducts,
                'remove': me.onRemoveProducts
            },
            'reschannablearticles-articles-tabs-article_mapping grid': {
                'selectionchange': me.onSelectionChange
            },
            'reschannablearticles-articles-tabs-article_mapping gridview': {
                'drop': me.onDragAndDropAssignment
            }
        });
    },

    /**
     * Event listener method which will be fired when the user selects an entry
     * in either the `toGrid` or the `fromGrid`.
     *
     * The method handles the enables / disables the buttons in the middle column
     * of the view and deselects all entries in the inactive grid.
     *
     * @param { Ext.selection.CheckboxModel } selModel
     * @param { Array } selection
     * @returns { boolean }
     */
    onSelectionChange: function(selModel, selection) {
        var me = this,
            view = me.getArticleMappingView(),
            activeGrid = selModel.view.panel, inactiveGrid,
            activeBtn, inactiveBtn;

        // Prevent the grid to get a little sluggish
        if(!selection.length) {
            return false;
        }

        inactiveGrid = (activeGrid.internalTitle === 'from') ? view.toGrid : view.fromGrid;

        if(activeGrid.internalTitle === 'from') {
            activeBtn = me.getAddButton();
            inactiveBtn = me.getRemoveButton();
        } else {
            activeBtn = me.getRemoveButton();
            inactiveBtn = me.getAddButton();
        }

        // Enable / disable buttons
        activeBtn.setDisabled(false);
        inactiveBtn.setDisabled(true);

        inactiveGrid.getSelectionModel().deselectAll(true);

        return true;
    },

    /**
     * Triggers a search by using an `extraParam` on the
     * associated store of the active grid.
     *
     * @param { String } value
     * @param { Ext.grid.Panel } activeGrid
     */
    onSearch: function(value, activeGrid) {
        var store = activeGrid.getStore();

        value = Ext.String.trim(value);
        store.currentPage = 1;

        store.getProxy().extraParams.search = (!value.length) ? '' : value;
        store.load();
    },

    /**
     * Event listener method which will be fired when the user presses
     * the upper button in the middle of the component, if the user
     * has a selection.
     *
     * The method collects the id's of the selected records and adds
     * them to the correct grid.
     *
     * @param { Shopware.apps.Category.view.category.tabs.ArticleMapping} scope
     * @returns { Boolean }
     */
    onAddProducts: function(scope) {
        var me = this, activeGrid = scope.fromGrid,
            inactiveGrid = scope.toGrid,
            store = activeGrid.getStore(),
            inactiveStore = inactiveGrid.getStore(),
            selection = activeGrid.getSelectionModel().getSelection(),
            ids = [], categoryId;

        if(!selection.length) {
            return false;
        }

        Ext.each(selection, function(sel) {
            ids.push(sel.data.articleId);
        });

        store.remove(selection);
        inactiveStore.add(selection);

        categoryId = store.getProxy().extraParams.categoryId;

        me._sendRequest('add', ids, categoryId);
        return true;
    },

    /**
     * Event listener method which will be fired when the user presses
     * the lower button in the middle of the component, if the user
     * has a selection.
     *
     * The method collects the id's of the selected records and adds
     * them to the correct grid.
     *
     * @param { Shopware.apps.Category.view.category.tabs.ArticleMapping } scope
     * @returns { Boolean }
     */
    onRemoveProducts: function(scope) {
        var me = this, activeGrid = scope.toGrid,
            inactiveGrid = scope.fromGrid,
            store = activeGrid.getStore(),
            inactiveStore = inactiveGrid.getStore(),
            selection = activeGrid.getSelectionModel().getSelection(),
            ids = [];

        if(!selection.length) {
            return false;
        }

        Ext.each(selection, function(sel) {
            ids.push(sel.data.articleId);
        });

        store.remove(selection);
        inactiveStore.add(selection);

        me._sendRequest('remove', ids);
        return true;
    },

    /**
     * Event listener method which will be fired when the user drags
     * records from one grid to the other one.
     *
     * The method collects the id's of the dropped records.
     *
     * @param { HTMLElement } node
     * @param { Object } data
     * @returns { Void }
     */
    onDragAndDropAssignment: function(node, data) {
        var me = this,
            activeView = data.view,
            activeGrid = activeView.panel,
            store = activeGrid.getStore(),
            records = data.records, action, ids = [];

        action = (activeGrid.internalTitle === 'from') ? 'add' : 'remove';

        Ext.each(records, function(record) {
            ids.push(record.data.articleId);
        });

        me._sendRequest(action, ids);
    },

    /**
     * Helper method which sents the AJAX request to add / remove
     * the records, which are associated with the incoming id's.
     *
     * @param { String } action - Action which will be used for the request: add (default), remove
     * @param { Array } ids - Array of record id's
     * @private
     */
    _sendRequest: function(action, ids) {
        var mapping = this.getArticleMappingView();
        var url = '{url controller=ReschannableArticles action=addChannableArticles}';
        var message = '{s name="action/addarticles/success"}[0]x articles assigned{/s}';
        var failure = '{s name="action/addarticles/failure"}The following error occurred while adding the articles:{/s}';

        if(action === 'remove') {
            message = '{s name="action/removearticles/success"}[0]x articles assignments removed{/s}';
            failure = '{s name="action/removearticles/failure"}The following error occurred while removing the articles:{/s}';

            url = '{url controller=ReschannableArticles action=removeChannableArticles}';
        }
        mapping.setLoading(true);

        Ext.Ajax.request({
            url: url,
            params: { ids: Ext.JSON.encode(ids) },
            success: function(response) {

                var result = Ext.decode(response.responseText);
                message = Ext.String.format(message, result.counter);
                Shopware.Notification.createGrowlMessage('',message);

                //reload the stores for the paging bar information
                mapping.toGrid.getStore().load({
                    callback:function () {
                        mapping.setLoading(false);
                    }
                });
                mapping.fromGrid.getStore().load();
                mapping.fireEvent('sendRequestSuccess', result);
            },
            failure: function(response) {
                mapping.setLoading(false);

                var result = Ext.decode(response.responseText);
                failure = failure + '<br>' + result.error;
                Shopware.Notification.createGrowlMessage('',message);
                mapping.fireEvent('sendRequestFailure', result);
            }
        });
    }
});
//{/block}
