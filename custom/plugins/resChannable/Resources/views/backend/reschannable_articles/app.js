/* {namespace name=backend/reschannable_articles/app} */

//{block name="backend/reschannable_articles/app"}
Ext.define('Shopware.apps.ReschannableArticles', {
    /**
     * Extends from our special controller, which handles the
     * sub-application behavior and the event bus
     * @string
     */
    extend:'Enlight.app.SubApplication',
    /**
     * The name of the module. Used for internal purpose
     * @string
     */
    name:'Shopware.apps.ReschannableArticles',
    /**
     * PHP Controller to use for the bulk loading
     * @string
     */
    loadPath:'{url action=load}',
    /**
     * Sets the loading path for the sub-application.
     *
     * Note that you'll need a "loadAction" in your
     * controller (server-side)
     * @string
     */
    bulkLoad: true,
    /**
     * Required stores for sub-application
     * @array
     */
    stores:[
        'Article',
        'AvailableProducts',
        'AssignedProducts'
    ],
    /**
     * Required views for this sub-application
     * @array
     */
    views: [
        'main.Window',
        'articles.tabs.ArticleMapping'
    ],
    /**
     * Required models for sub-application
     * @array
     */
    models:[
        'Article',
        'ProductAssignment'
    ],
    /**
     * Required controllers for sub-application
     * @array
     */
    controllers:[
        'Main',
        'ArticleMapping'
    ],
    /**
     * Returns the main application window for this is expected
     * by the Enlight.app.SubApplication class.
     * The class sets a new event listener on the "destroy" event of
     * the main application window to perform the destroying of the
     * whole sub application when the user closes the main application window.
     *
     * This method will be called when all dependencies are solved and
     * all member controllers, models, views and stores are initialized.
     *
     * @private
     * @return [object] mainWindow - the main application window based on Enlight.app.Window
     */
    launch: function () {
        var me = this,
            mainController = me.getController('Main');

        return me.mainWindow = mainController.mainWindow;
    }
});
//{/block}
