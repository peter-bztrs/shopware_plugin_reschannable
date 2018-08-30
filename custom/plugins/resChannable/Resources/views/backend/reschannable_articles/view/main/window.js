/* {namespace name=backend/reschannable_articles/view/main/window} */

//{block name="backend/reschannable_articles/view/main/window"}
Ext.define('Shopware.apps.ReschannableArticles.view.main.Window', {

    /**
     * Parent Element Enlight.app.Window
     * @string
     */
    extend: 'Enlight.app.Window',

    /**
     * Title of this window
     * @string
     */
    title: '{s name=main_title}Articles{/s}',

    /**
     * XType for this component
     * @string
     */
    alias: 'widget.reschannablearticles-main-window',

    /**
     * Enables  / Disables border
     * Default: false
     * @boolean
     */
    border: false,

    /**
     * Enabled / disables autoShow
     * Default: true
     * @boolean
     */
    autoShow: true,

    /**
     * Layout setting for this sub-application
     * Default: border
     * @string
     */
    layout: 'border',

    /**
     * Height setting for this window in pixel
     * Default: 600 px
     * @integer
     */
    height: '90%',

    /**
     * Width setting for this window in pixel
     * Default: 925 px
     * @integer
     */
    width: '80%',

    /**
     * A flag which causes the object to attempt to restore the state of internal properties from a saved state on startup.
     * @boolean
     */
    stateful:true,

    /**
     * The unique id for this object to use for state management purposes.
     */
    stateId:'reschannable-reschannablearticles-main-window',

    /**
     * Containing the tabs with the overview and the settings
     * @array of Ext.tab.Panel
     */
    tabPanel : null,

    /**
     * Masks the viewport when the window is visible.
     * @boolean
     */
    modal: false,

    /**
     * Initializes the component and builds up the main interface
     *
     * @public
     * @return void
     */
    initComponent: function() {
        var me = this;

        me.addEvents('saveDetail');

        me.tabPanel = Ext.create('Ext.tab.Panel', {
            region:'center',
            items:me.getTabs(),
            split: true
            //dockedItems: me.getDockedItems()
        });

        me.items = [
            /*{
                xtype:'category-category-tree',
                split: true,
                store:me.treeStore
            },*/
            me.tabPanel
        ];

        me.callParent(arguments);
    },

    /**
     * Creates the tabs for the tab panel of the window.
     * Contains the detail form which is used to display the customer data for an existing customer
     * or to create a new customer.
     * Can contains additionally an second tab which displays the customer orders and a chart which
     * displays the orders grouped by the order year and month
     *
     * @public
     * @return Array of components
     */
    getTabs:function () {
        var me = this;

        /*me.articleMappingContainer = Ext.create('Ext.panel.Panel', {
            title:'{s name=tabs/article_mapping/title}Article-Mapping{/s}',
            //disabled: true,
            layout: 'fit'
        });*/

        return [
            {
                xtype:'reschannablearticles-articles-tabs-article_mapping',
                title:'{s name=tabs/article_mapping/title}Article-Mapping{/s}',
                availableProductsStore : me.availableProductsStore,
                assignedProductsStore : me.assignedProductsStore
            }
            //,me.articleMappingContainer
        ];
    },

});
//{/block}
