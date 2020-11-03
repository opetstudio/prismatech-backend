'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _MaterialUI = MaterialUI,
    Button = _MaterialUI.Button,
    Card = _MaterialUI.Card,
    CardActions = _MaterialUI.CardActions,
    CardContent = _MaterialUI.CardContent,
    CardMedia = _MaterialUI.CardMedia,
    CssBaseline = _MaterialUI.CssBaseline,
    Grid = _MaterialUI.Grid,
    Typography = _MaterialUI.Typography,
    makeStyles = _MaterialUI.makeStyles,
    Container = _MaterialUI.Container,
    Fab = _MaterialUI.Fab,
    Badge = _MaterialUI.Badge,
    Snackbar = _MaterialUI.Snackbar,
    Alert = _MaterialUI.Alert,
    CardActionArea = _MaterialUI.CardActionArea,
    CircularProgress = _MaterialUI.CircularProgress,
    IconButton = _MaterialUI.IconButton,
    SvgIcon = _MaterialUI.SvgIcon,
    Chip = _MaterialUI.Chip;


var backendBaseUrl = TOKOONLINE_BASEURL;

var useStyles = makeStyles(function (theme) {
    return {
        // catalogue style
        mkPlinkCatIcon: {
            marginRight: theme.spacing(2)
        },
        mkPlinkCatHeroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6)
        },
        mkPlinkCatHeroButtons: {
            marginTop: theme.spacing(4)
        },
        mkPlinkCatCardGrid: {
            // padding: theme.spacing(4)
        },
        mkPlinkCatCard: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        mkPlinkCatCardMedia: {
            paddingTop: '56.25%' // 16:9
        },
        mkPlinkCatCardContent: {
            flexGrow: 1
        },
        mkPlinkCatFabCart: {
            marginBottom: '0.5rem'
        },
        mkPlinkCatCustomHover: {
            '&:hover': {
                background: "#F6F6F6",
                color: "#212121"
            }
        },
        mkPlinkCatCustomButton: {
            '&:hover': {
                color: "#3F51B5"
            }
        },
        // category style
        mkPlinkCatgToolbar: {
            borderBottom: '1px solid ' + theme.palette.divider
        },
        mkPlinkCatgToolbarTitle: {
            flex: 1
        },
        mkPlinkCatgToolbarSecondary: {
            justifyContent: 'space-between',
            overflowX: 'auto',
            zIndex: 3
        },
        mkPlinkCatgToolbarLink: {
            padding: theme.spacing(1),
            flexShrink: 0
        },
        mkPlinkCatgToolbarPrimary: {
            zIndex: 3
        },
        mkPlinkCatgToolbarPrimaryBox: {
            // backgroundColor:
            //     theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
        },
        mkPlinkCatgToolbarPrimaryBoxGrid: {
            // marginTop: theme.spacing(3),
        },
        chip: {
            margin: theme.spacing(0.5)
        }
    };
});
var fabPosition = document.getElementById('tokoonline_content').dataset.fabposition;

function App() {
    var tokoonlinesessionid = localStorage.getItem(TOKOONLINE_TOKOID);
    if (!tokoonlinesessionid) localStorage.setItem(TOKOONLINE_TOKOID, '' + new Date().getTime());
    var classes = useStyles();

    var _React$useState = React.useState({
        error: null,
        listData: null,
        pageCount: 0,
        pageIndex: 0,
        pageSize: 0,
        count: 0,
        isRequest: true
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        productCatalogRequest = _React$useState2[0],
        setProductCatalogRequest = _React$useState2[1];

    var _React$useState3 = React.useState({
        error: null,
        isRequest: false
    }),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        addToCartRequest = _React$useState4[0],
        setAddToCartRequest = _React$useState4[1];

    console.log('category id===>', window.location.hash.substring(1));

    var _React$useState5 = React.useState(window.location.hash.substring(1)),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        categoryId = _React$useState6[0],
        setCategoryId = _React$useState6[1];

    window.addEventListener('popstate', function () {
        console.log('location changed!');
        setCategoryId(window.location.hash.substring(1));
    });

    var doFetchData = React.useCallback(function (_ref) {
        var page = _ref.page,
            categoryId = _ref.categoryId;


        // let categoryId = window.location.hash.substring(1);
        var filterByCategory = '';
        if (categoryId) {
            filterByCategory = 'category_id: "' + categoryId + '",';
        }

        //     // fetch product
        // Simple POST request with a JSON body using fetch
        var graphqlData = 'query{\n      getAllTokoProductsByTokoId(\n        toko_id: "' + TOKOONLINE_TOKOID + '",\n        ' + filterByCategory + '\n        page_size: 9, \n        page_index: ' + page + ', \n        string_to_search: ""\n       ){\n        error,\n        count,\n        page_count,\n        status,\n        list_data{\n          _id,\n          name,\n          price,\n          code,\n          instock_label,\n          preorder_policy,\n          stock_amount,\n          description,\n          category_id{\n            _id,\n            title,   \n          },\n          image_id{\n            _id,\n            filename,\n            file_type\n          }\n        }\n      }\n    }';
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: graphqlData })
        };
        fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log('response===>', response);
            // response.json()
            return response.data.getAllTokoProductsByTokoId;
        }).then(function (data) {
            return setProductCatalogRequest({
                listData: data.list_data,
                pageCount: data.page_count,
                count: data.count,
                isRequest: false
            });
        });
    }, []);

    var doAddToCart = function doAddToCart(_ref2) {
        var productId = _ref2.productId;

        var graphqlData = 'mutation{addToCart( toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n                          code,\n                          price,\n                          description,\n                          image_id{\n                            _id,\n                            filename,\n                            file_type\n                          }\n                        }\n                        count,\n                        device_id,\n                        session_id,\n                        toko_id{\n                          slug\n                        }\n                      }\n                    }\n                    }';
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: graphqlData })
        };
        fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log('response===>', response);
            if (response.errors) return alert(JSON.stringify(response.errors));
            return response.data.addToCart;
        }).then(function (data) {
            if (!data) return;
            setAddToCartRequest({ error: data.error, isRequest: false });
            if (!data.error) {
                handleToastOpen(); //window.location.href = TOKOONLINE_PAGE_SHOPPING_CART
            } else alert(data.error);
        });
    };

    var _React$useState7 = React.useState(false),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        open = _React$useState8[0],
        setOpen = _React$useState8[1];

    var handleToastOpen = function handleToastOpen() {
        setOpen(true);
    };

    var handleToastClose = function handleToastClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    var error = productCatalogRequest.error,
        count = productCatalogRequest.count,
        pageCount = productCatalogRequest.pageCount,
        isRequest = productCatalogRequest.isRequest,
        listData = productCatalogRequest.listData,
        pageIndex = productCatalogRequest.pageIndex,
        pageSize = productCatalogRequest.pageSize;

    var _React$useState9 = React.useState(0),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        page = _React$useState10[0],
        setPage = _React$useState10[1];

    React.useEffect(function () {
        doFetchData({ page: page, categoryId: categoryId });
    }, [page, categoryId]);

    var convertRupiah = function convertRupiah(param) {
        var reverse = param.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');

        return "Rp. " + ribuan;
    };

    var goToCart = function goToCart() {
        window.location.href = TOKOONLINE_PAGE_SHOPPING_CART;
    };

    var _React$useState11 = React.useState(0),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        cart = _React$useState12[0],
        setCart = _React$useState12[1];

    var handlePage = function handlePage(param) {
        param ? setPage(page + 1) : page === 0 ? setPage(0) : setPage(page - 1);
    };

    return React.createElement(
        'div',
        null,
        React.createElement(CssBaseline, null),
        productCatalogRequest.isRequest ? React.createElement(
            Grid,
            {
                container: true,
                spacing: 0,
                direction: 'column',
                alignItems: 'center',
                justify: 'center',
                style: { minHeight: '100vh' }
            },
            React.createElement(CircularProgress, null)
        ) : React.createElement(
            Container,
            { className: classes.mkPlinkCatCardGrid, maxWidth: 'lg' },
            React.createElement(
                Grid,
                {
                    container: true,
                    direction: 'row',
                    justify: 'space-between',
                    alignItems: 'center'
                },
                React.createElement(
                    'h1',
                    { style: { color: '#4B8BE2' } },
                    'Catalog'
                ),
                React.createElement(
                    Badge,
                    { style: { marginRight: 11 }, onClick: goToCart, badgeContent: 0, color: 'secondary' },
                    React.createElement(
                        IconButton,
                        { edge: 'end', 'aria-label': 'delete',
                            style: { backgroundColor: '#4B8BE2' } },
                        React.createElement(
                            SvgIcon,
                            { viewBox: "-3 0 512 512" },
                            React.createElement('path', { fill: '#fff', d: 'm147.925 379.116c-22.357-1.142-21.936-32.588-.001-33.68 62.135.216 226.021.058 290.132.103 17.535 0 32.537-11.933 36.481-29.017l36.404-157.641c2.085-9.026-.019-18.368-5.771-25.629s-14.363-11.484-23.626-11.484c-25.791 0-244.716-.991-356.849-1.438l-17.775-65.953c-4.267-15.761-18.65-26.768-34.978-26.768h-56.942c-8.284 0-15 6.716-15 15s6.716 15 15 15h56.942c2.811 0 5.286 1.895 6.017 4.592l68.265 253.276c-12.003.436-23.183 5.318-31.661 13.92-8.908 9.04-13.692 21.006-13.471 33.695.442 25.377 21.451 46.023 46.833 46.023h21.872c-3.251 6.824-5.076 14.453-5.076 22.501 0 28.95 23.552 52.502 52.502 52.502s52.502-23.552 52.502-52.502c0-8.049-1.826-15.677-5.077-22.501h94.716c-3.248 6.822-5.073 14.447-5.073 22.493 0 28.95 23.553 52.502 52.502 52.502 28.95 0 52.503-23.553 52.503-52.502 0-8.359-1.974-16.263-5.464-23.285 5.936-1.999 10.216-7.598 10.216-14.207 0-8.284-6.716-15-15-15zm91.799 52.501c0 12.408-10.094 22.502-22.502 22.502s-22.502-10.094-22.502-22.502c0-12.401 10.084-22.491 22.483-22.501h.038c12.399.01 22.483 10.1 22.483 22.501zm167.07 22.494c-12.407 0-22.502-10.095-22.502-22.502 0-12.285 9.898-22.296 22.137-22.493h.731c12.24.197 22.138 10.208 22.138 22.493-.001 12.407-10.096 22.502-22.504 22.502zm74.86-302.233c.089.112.076.165.057.251l-15.339 66.425h-51.942l8.845-67.023 58.149.234c.089.002.142.002.23.113zm-154.645 163.66v-66.984h53.202l-8.84 66.984zm-74.382 0-8.912-66.984h53.294v66.984zm-69.053 0h-.047c-3.656-.001-6.877-2.467-7.828-5.98l-16.442-61.004h54.193l8.912 66.984zm56.149-96.983-9.021-67.799 66.306.267v67.532zm87.286 0v-67.411l66.022.266-8.861 67.145zm-126.588-67.922 9.037 67.921h-58.287l-18.38-68.194zm237.635 164.905h-36.426l8.84-66.984h48.973l-14.137 61.217c-.784 3.396-3.765 5.767-7.25 5.767z' })
                        )
                    )
                )
            ),
            React.createElement(Snackbar, {
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left'
                },
                open: open,
                autoHideDuration: 1000,
                onClose: handleToastClose,
                message: 'Berhasil ditambahkan'
            }),
            React.createElement(
                Grid,
                { container: true, spacing: 2 },
                (listData || []).map(function (v, i) {
                    return v.preorder_policy !== 'unavailable' ? React.createElement(
                        Grid,
                        { item: true, key: i, xs: 6, sm: 6, md: 6, lg: 4 },
                        React.createElement(
                            Card,
                            { className: classes.mkPlinkCatCard },
                            React.createElement(
                                CardActionArea,
                                { className: classes.mkPlinkCatCustomHover, onClick: function onClick() {
                                        window.location.href = TOKOONLINE_PAGE_PRODUCT_DETAIL + '#' + v.code;
                                    } },
                                React.createElement(CardMedia, {
                                    className: classes.mkPlinkCatCardMedia,
                                    image: backendBaseUrl + '/renderfile/' + (v.image_id || {}).filename + '.' + (v.image_id || {}).file_type,
                                    title: v.name
                                }),
                                React.createElement(Chip, { style: { marginTop: 10, marginLeft: 16 }, size: 'small', color: 'primary', label: v.stock_amount == 0 && v.preorder_policy == "preorder_policy" ? "Pre-Order" : v.instock_label }),
                                React.createElement(
                                    CardContent,
                                    { className: classes.mkPlinkCatCardContent },
                                    React.createElement(
                                        Typography,
                                        { gutterBottom: true, variant: 'h6', noWrap: true },
                                        v.name
                                    ),
                                    React.createElement(
                                        Typography,
                                        null,
                                        convertRupiah(v.price)
                                    )
                                )
                            ),
                            React.createElement(
                                CardActions,
                                null,
                                React.createElement(
                                    Button,
                                    {
                                        onClick: function onClick() {
                                            doAddToCart({ productId: '' + v._id });
                                        },
                                        size: 'small',
                                        className: classes.mkPlinkCatCustomButton,
                                        color: 'primary' },
                                    'Add To Cart'
                                )
                            )
                        )
                    ) : "";
                })
            ),
            React.createElement(
                Grid,
                {
                    container: true,
                    direction: 'row',
                    justify: 'center',
                    alignItems: 'center'
                },
                React.createElement(
                    IconButton,
                    { onClick: function onClick() {
                            return handlePage();
                        }, edge: 'end', 'aria-label': 'delete',
                        style: { marginTop: 20, marginRight: 10 } },
                    React.createElement(
                        SvgIcon,
                        null,
                        React.createElement('path', {
                            d: 'M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z' })
                    )
                ),
                React.createElement(
                    'h4',
                    { style: { marginTop: 20, paddingTop: 15 } },
                    page + 1
                ),
                React.createElement(
                    IconButton,
                    { onClick: function onClick() {
                            return handlePage(true);
                        }, edge: 'end', 'aria-label': 'delete',
                        style: { marginTop: 20, marginLeft: 10 } },
                    React.createElement(
                        SvgIcon,
                        null,
                        React.createElement('path', {
                            d: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z' })
                    )
                )
            )
        )
    );
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#tokoonline_content'));