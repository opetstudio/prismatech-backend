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
    SvgIcon = _MaterialUI.SvgIcon;


var backendBaseUrl = TOKOONLINE_BASEURL;

var useStyles = makeStyles(function (theme) {
    return {
        icon: {
            marginRight: theme.spacing(2)
        },
        heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6)
        },
        heroButtons: {
            marginTop: theme.spacing(4)
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8)
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        cardMedia: {
            paddingTop: '56.25%' // 16:9
        },
        cardContent: {
            flexGrow: 1
        },
        footer: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(6)
        },
        fabCart: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };
});

// class App extends React.Component {
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

    var doFetchData = React.useCallback(function (page) {
        //     // fetch product
        // Simple POST request with a JSON body using fetch
        var graphqlData = 'query{\n      getAllTokoProductsByTokoId(toko_id: "' + TOKOONLINE_TOKOID + '" ,page_size: 10, page_index: ' + page + ', string_to_search: ""){\n        error,\n        count,\n        page_count,\n        status,\n        list_data{\n          _id,\n          name,\n          price,\n          code,\n          description,\n          image_id{\n            _id,\n            filename,\n            file_type\n          }\n        }\n      }\n    }';
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

    var doAddToCart = function doAddToCart(_ref) {
        var productId = _ref.productId;

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

    var _React$useState5 = React.useState(false),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        open = _React$useState6[0],
        setOpen = _React$useState6[1];

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

    var _React$useState7 = React.useState(0),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        page = _React$useState8[0],
        setPage = _React$useState8[1];

    React.useEffect(function () {
        doFetchData(page);
    }, [page]);

    var convertRupiah = function convertRupiah(param) {
        var reverse = param.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');

        return "Rp. " + ribuan;
    };

    var goToCart = function goToCart() {
        window.location.href = TOKOONLINE_PAGE_SHOPPING_CART;
    };

    var _React$useState9 = React.useState(0),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        cart = _React$useState10[0],
        setCart = _React$useState10[1];

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
            { className: classes.cardGrid, maxWidth: 'md' },
            React.createElement(
                Grid,
                {
                    container: true,
                    direction: 'row',
                    justify: 'flex-end',
                    alignItems: 'flex-end'
                },
                React.createElement(
                    Badge,
                    { onClick: goToCart, badgeContent: cart, color: 'secondary',
                        style: { position: 'fixed', zIndex: 2 } },
                    React.createElement(
                        IconButton,
                        { edge: 'end', 'aria-label': 'delete',
                            style: { marginTop: -2, marginRight: -5, backgroundColor: '#efefef' } },
                        React.createElement(
                            SvgIcon,
                            null,
                            React.createElement('path', {
                                d: 'M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z' })
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
                { container: true, spacing: 4, style: { marginTop: 10 } },
                (listData || []).map(function (v, i) {
                    return React.createElement(
                        Grid,
                        { item: true, key: i, xs: 12, sm: 6, md: 4 },
                        React.createElement(
                            Card,
                            { className: classes.card },
                            React.createElement(
                                CardActionArea,
                                { onClick: function onClick() {
                                        window.location.href = TOKOONLINE_PAGE_PRODUCT_DETAIL + '#' + v.code;
                                    } },
                                React.createElement(CardMedia, {
                                    className: classes.cardMedia,
                                    image: backendBaseUrl + '/renderfile/' + (v.image_id || {}).filename + '.' + (v.image_id || {}).file_type,
                                    title: v.name
                                }),
                                React.createElement(
                                    CardContent,
                                    { className: classes.cardContent },
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
                                        color: 'primary' },
                                    'Add To Cart'
                                )
                            )
                        )
                    );
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