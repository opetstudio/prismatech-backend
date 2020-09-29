'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _MaterialUI = MaterialUI,
    makeStyles = _MaterialUI.makeStyles,
    Paper = _MaterialUI.Paper,
    Grid = _MaterialUI.Grid,
    Card = _MaterialUI.Card,
    CardMedia = _MaterialUI.CardMedia,
    Button = _MaterialUI.Button,
    Skeleton = _MaterialUI.Skeleton,
    Container = _MaterialUI.Container,
    Carousel = _MaterialUI.Carousel,
    ButtonGroup = _MaterialUI.ButtonGroup,
    InputBase = _MaterialUI.InputBase,
    CardContent = _MaterialUI.CardContent,
    Box = _MaterialUI.Box,
    Typography = _MaterialUI.Typography,
    Chip = _MaterialUI.Chip,
    CloseIcon = _MaterialUI.CloseIcon,
    ShopingCartIcon = _MaterialUI.ShopingCartIcon,
    AddIcon = _MaterialUI.AddIcon,
    RemoveIcon = _MaterialUI.RemoveIcon,
    TextField = _MaterialUI.TextField,
    Snackbar = _MaterialUI.Snackbar,
    CircularProgress = _MaterialUI.CircularProgress,
    IconButton = _MaterialUI.IconButton,
    SvgIcon = _MaterialUI.SvgIcon,
    Badge = _MaterialUI.Badge;

var e = React.createElement;

var backendBaseUrl = TOKOONLINE_BASEURL;

var useStyles = makeStyles(function (theme) {
    return {
        heroContent: {
            marginTop: 100,
            marginBottom: 30,
            padding: 20,
            background: '#fff'
        },
        sectionDesktop: _defineProperty({
            display: 'none'
        }, theme.breakpoints.up('md'), {
            display: 'flex'
        }),
        sectionMobile: _defineProperty({
            display: 'flex'
        }, theme.breakpoints.up('md'), {
            display: 'none'
        }),
        product_img_md: {
            width: 400,
            height: 400
        },
        product_empty_md: {
            width: 400,
            height: 400,
            background: '#A6ACAF'
        },
        product_img_xs: {
            width: 300,
            height: 300
        },
        product_empty_xs: {
            width: 300,
            height: 300,
            background: '#A6ACAF'
        },
        product_name: {
            marginTop: 10,
            marginBottom: 0,
            fontSize: 24,
            fontWeight: 700
        },
        product_detail: {
            margin: '2rem 1rem',
            textAlign: 'justify'
        },
        statusLabel_01: {
            background: '#109607',
            color: 'white',
            fontWeight: '700'
        },
        statusLabel_02: {
            background: '#F6D20B',
            color: 'white',
            fontWeight: '700'
        },
        addToCartContainer: {
            background: '#F7F9F9',
            // margin: '1rem 0',
            padding: '1rem'
        },
        priceContainer: {
            marginTop: 10,
            marginBottom: 0,
            color: '#AF1200',
            fontWeight: 'bold',
            fontSize: '1.5rem'
        },
        inputRoot: {
            height: '2rem',
            color: 'inherit',
            background: '#fff'
        },
        inputInput: _defineProperty({
            fontSize: '12px',
            padding: '1rem',
            // vertical padding + font size from searchIcon
            transition: theme.transitions.create('width'),
            width: '100%'
        }, theme.breakpoints.up('md'), {
            width: '1.5rem'
        }),
        btnActionRed: {
            margin: '1rem 1rem 2rem 0',
            fontSize: '0.7rem'
        },
        spesifikasiContainer: {
            margin: '0 0 1.5rem',
            padding: '2rem 2rem',
            background: '#fff'
        },
        spesifikasiTitleContainer: {
            background: '#D0D3D4',
            borderRadius: '1rem',
            padding: '1rem',
            margin: '1rem 0'
        },
        spesifikasiTitle: {
            fontWeight: 'bold',
            fontSize: '1.2rem'
        },
        spesifikasi_table: {
            margin: '2rem 1rem'
        },
        bc_link: {
            color: '#D35400'
        },
        success_color: {
            background: '#357a38',
            color: "#fff",
            marginRight: "0.5rem"
        }
    };
});

function App() {
    var tokoonlinesessionid = localStorage.getItem(TOKOONLINE_TOKOID);
    if (!tokoonlinesessionid) localStorage.setItem(TOKOONLINE_TOKOID, '' + new Date().getTime());
    var classes = useStyles();

    var _React$useState = React.useState({
        error: null,
        detailData: null,
        isRequest: true
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        productDetailRequest = _React$useState2[0],
        setProductDetailRequest = _React$useState2[1];

    var _React$useState3 = React.useState({
        error: null,
        isRequest: false
    }),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        addToCartRequest = _React$useState4[0],
        setAddToCartRequest = _React$useState4[1];

    var doAddToCart = function doAddToCart(_ref) {
        var productId = _ref.productId;

        if (qty < 1) return;
        var graphqlData = 'mutation{addToCart(count:' + qty + ', toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n                            code,\n                            price,\n                            description,\n                            image_id{\n                              _id,\n                              filename,\n                              file_type\n                            }\n                          }\n                          count,\n                          amount,\n                          device_id,\n                          session_id,\n                          toko_id{\n                            slug\n                          }\n                        }\n                      }\n                      }';
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
            // if (data.error) alert(data.error)
            // else setProductCatalogRequest({ reload: reload + 1 })
            if (!data.error) handleToastOpen(); //window.location.href = TOKOONLINE_PAGE_SHOPPING_CART
            else alert(data.error);
        });
    };

    var doFastOrder = function doFastOrder(_ref2) {
        var productId = _ref2.productId;

        var graphqlData = 'mutation{addToCart(count:' + (qty === 0 ? 1 : qty) + ', toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n                            code,\n                            price,\n                            description,\n                            image_id{\n                              _id,\n                              filename,\n                              file_type\n                            }\n                          }\n                          count,\n                          amount,\n                          device_id,\n                          session_id,\n                          toko_id{\n                            slug\n                          }\n                        }\n                      }\n                      }';
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
            // if (data.error) alert(data.error)
            // else setProductCatalogRequest({ reload: reload + 1 })
            if (!data.error) window.location.href = TOKOONLINE_PAGE_SHOPPING_CART;else alert(data.error);
        });
    };

    var _React$useState5 = React.useState(1),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        qty = _React$useState6[0],
        setQty = _React$useState6[1];

    var doFetchData = React.useCallback(function () {
        var graphqlData = 'query{\n        getDetailTokoProductJoinCartByCode(code: "' + decodeURIComponent(window.location.hash.substring(1)) + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){\n        error,\n        status,\n        data_detail_in_cart{\n            count\n        },\n        data_detail{\n          _id,\n          name,\n          price,\n          code,\n          content1,\n          description,\n          image_id{\n            _id,\n            filename,\n            file_type\n          },\n            category_id{\n                _id,\n                title\n            }\n        }\n      }\n    }';
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: graphqlData })
        };
        fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log('cat===>', JSON.stringify(response));
            // response.json()
            return response.data.getDetailTokoProductJoinCartByCode;
        }).then(function (data) {
            setProductDetailRequest({
                cartDetail: data.data_detail_in_cart,
                detailData: data.data_detail,
                isRequest: false,
                error: null
            });
            setQty((data.data_detail_in_cart || {}).count || 1);
        });
    }, []);
    var error = productDetailRequest.error,
        isRequest = productDetailRequest.isRequest;

    var detailData = productDetailRequest.detailData || {};

    React.useEffect(function () {
        doFetchData();
    }, [doFetchData]);

    var handleDecreaseItem = function handleDecreaseItem() {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    var handleIncreaseItem = function handleIncreaseItem() {
        setQty(qty + 1);
    };

    var convertRupiah = function convertRupiah(param) {
        var reverse = param.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');

        return "Rp. " + ribuan;
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

    var _React$useState9 = React.useState(0),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        cart = _React$useState10[0],
        setCart = _React$useState10[1];

    var goToCart = function goToCart() {
        window.location.href = TOKOONLINE_PAGE_SHOPPING_CART;
    };

    return (
        // newest
        React.createElement(
            'div',
            null,
            productDetailRequest.isRequest ? React.createElement(
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
                null,
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
                    'div',
                    { className: classes.heroContent },
                    React.createElement(
                        Grid,
                        { container: true, spacing: 5, justify: 'center' },
                        React.createElement(
                            Grid,
                            { item: true },
                            React.createElement(
                                'div',
                                { className: classes.sectionDesktop },
                                isRequest ? React.createElement(Skeleton, { variant: 'rect', animation: 'wave', width: 400, height: 400 }) : React.createElement(CardMedia, {
                                    className: classes.product_img_md,
                                    image: backendBaseUrl + '/renderfile/' + (detailData.image_id || {}).filename + '.' + (detailData.image_id || {}).file_type,
                                    title: 'Image title'
                                })
                            ),
                            React.createElement(
                                'div',
                                { className: classes.sectionMobile },
                                isRequest ? React.createElement(Skeleton, { variant: 'rect', animation: 'wave', width: 300, height: 300 }) : React.createElement(CardMedia, {
                                    className: classes.product_img_md,
                                    image: backendBaseUrl + '/renderfile/' + (detailData.image_id || {}).filename + '.' + (detailData.image_id || {}).file_type,
                                    title: 'Image title'
                                })
                            )
                        ),
                        React.createElement(
                            Grid,
                            { item: true, xs: 12, sm: 6, md: 4 },
                            React.createElement(
                                Grid,
                                { container: true, spacing: 2, direction: 'row' },
                                React.createElement(
                                    Grid,
                                    { item: true },
                                    isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 60, width: '5rem' }) :
                                    // check if stock exist next
                                    React.createElement(Chip, { label: 'Ada Stok' })
                                ),
                                React.createElement(
                                    Grid,
                                    { item: true },
                                    isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 60, width: '5rem' }) :
                                    // need to return category from backend
                                    (detailData.category_id || []).map(function (key) {
                                        // console.log(key.title)
                                        return React.createElement(Chip, { key: key._id, label: key.title,
                                            className: classes.success_color,
                                            onClick: function onClick() {
                                                window.location.href = TOKOONLINE_PAGE_PRODUCT_CATALOG + "#" + key._id;
                                            } });
                                    })
                                )
                            ),
                            React.createElement(
                                Grid,
                                { container: true, spacing: 2, direction: 'column' },
                                React.createElement(
                                    Typography,
                                    { className: classes.product_name, component: 'p' },
                                    isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50 }) : detailData.name
                                ),
                                React.createElement(
                                    Typography,
                                    { className: classes.priceContainer },
                                    isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50, width: '30%' }) : convertRupiah(detailData.price || 0)
                                ),
                                React.createElement(
                                    Grid,
                                    { item: true, style: { padding: 0, marginTop: 10 } },
                                    React.createElement(Typography, { className: classes.spesifikasiTitle }),
                                    React.createElement(
                                        Typography,
                                        { style: { marginBottom: 10 } },
                                        detailData.description
                                    )
                                ),
                                React.createElement(
                                    Box,
                                    null,
                                    isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 100 }) : React.createElement(
                                        Grid,
                                        { container: true, className: classes.addToCartContainer },
                                        React.createElement(
                                            Grid,
                                            { item: true, xs: 6, sm: 6, md: 6 },
                                            React.createElement(
                                                Typography,
                                                { color: 'textSecondary' },
                                                'Qty'
                                            )
                                        ),
                                        React.createElement(
                                            Grid,
                                            { item: true, xs: 6, sm: 6, md: 6 },
                                            React.createElement(
                                                ButtonGroup,
                                                { disableElevation: true, variant: 'contained' },
                                                React.createElement(
                                                    Button,
                                                    { size: 'small', onClick: handleDecreaseItem },
                                                    '-'
                                                ),
                                                React.createElement(TextField, {
                                                    id: 'outlined-size-small',
                                                    value: qty,
                                                    variant: 'outlined',
                                                    type: 'number',
                                                    size: 'small'
                                                }),
                                                React.createElement(
                                                    Button,
                                                    { size: 'small', onClick: handleIncreaseItem },
                                                    '+'
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: classes.sectionDesktop },
                                    isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50, width: 200,
                                        style: { marginRight: '1rem' } }) : React.createElement(
                                        Button,
                                        { variant: 'outlined', color: 'primary',
                                            className: classes.btnActionRed,
                                            onClick: function onClick() {
                                                return doAddToCart({ productId: detailData._id });
                                            }
                                        },
                                        'Tambah ke keranjang'
                                    ),
                                    isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50, width: 150 }) : React.createElement(
                                        Button,
                                        { variant: 'contained', color: 'secondary',
                                            onClick: function onClick() {
                                                return doFastOrder({ productId: detailData._id });
                                            },
                                            className: classes.btnActionRed },
                                        'Beli Sekarang'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: classes.sectionMobile },
                                    isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50, width: 200,
                                        style: { marginRight: '1rem' } }) : React.createElement(
                                        Button,
                                        { variant: 'outlined', color: 'secondary',
                                            className: classes.btnActionRed },
                                        'Tambah ke keranjang'
                                    ),
                                    isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50, width: 150 }) : React.createElement(
                                        Button,
                                        { variant: 'contained', color: 'secondary',
                                            onClick: function onClick() {
                                                return doFastOrder({ productId: detailData._id });
                                            },
                                            className: classes.btnActionRed },
                                        'Beli Sekarang'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: classes.spesifikasiContainer },
                    React.createElement(
                        Container,
                        { className: classes.spesifikasiTitleContainer },
                        React.createElement(
                            Typography,
                            { className: classes.spesifikasiTitle },
                            'Deskripsi produk'
                        )
                    ),
                    React.createElement('div', { className: classes.product_detail,
                        dangerouslySetInnerHTML: { __html: decodeURIComponent(detailData.content1) } })
                )
            )
        )
    );
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#tokoonline_content'));