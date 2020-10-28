'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    IconButton = _MaterialUI.IconButton,
    SkipNextIcon = _MaterialUI.SkipNextIcon,
    SkipPreviousIcon = _MaterialUI.SkipPreviousIcon,
    PlayArrowIcon = _MaterialUI.PlayArrowIcon,
    useTheme = _MaterialUI.useTheme,
    TextField = _MaterialUI.TextField,
    FormControlLabel = _MaterialUI.FormControlLabel,
    Checkbox = _MaterialUI.Checkbox,
    Avatar = _MaterialUI.Avatar,
    ListItem = _MaterialUI.ListItem,
    ListItemAvatar = _MaterialUI.ListItemAvatar,
    ListItemText = _MaterialUI.ListItemText,
    ListItemSecondaryAction = _MaterialUI.ListItemSecondaryAction,
    Divider = _MaterialUI.Divider,
    FormControl = _MaterialUI.FormControl,
    InputLabel = _MaterialUI.InputLabel,
    Select = _MaterialUI.Select,
    MenuItem = _MaterialUI.MenuItem,
    FormHelperText = _MaterialUI.FormHelperText,
    Modal = _MaterialUI.Modal,
    List = _MaterialUI.List,
    Backdrop = _MaterialUI.Backdrop,
    Fade = _MaterialUI.Fade,
    CircularProgress = _MaterialUI.CircularProgress;


var backendBaseUrl = TOKOONLINE_BASEURL;

var useStyles = makeStyles(function (theme) {
    return {
        root: {
            margin: 8,
            backgroundColor: theme.palette.background.paper,
            overflow: 'hidden'
        },
        margin: {
            margin: theme.spacing(1)
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3)
        }
    };
});

// class App extends React.Component {

function getCookie(cname) {
    console.log('document.cookie', document.cookie);
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function setCookie(cname, cvalue, exdays) {
    console.log('setCookie===>', cname);
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/*';
}

function App() {
    var tokoonlinesessionid = localStorage.getItem(TOKOONLINE_TOKOID);
    if (!tokoonlinesessionid) localStorage.setItem(TOKOONLINE_TOKOID, '' + new Date().getTime());
    var classes = useStyles();
    var theme = useTheme();

    var _React$useState = React.useState({
        error: null,
        listData: null,
        pageCount: 0,
        pageIndex: 0,
        pageSize: 0,
        count: 0,
        reload: 0,
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

    var _React$useState5 = React.useState({
        payload: {},
        error: null,
        isRequest: false
    }),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        checkoutProcessRequest = _React$useState6[0],
        setCheckoutProcessRequest = _React$useState6[1];

    var _React$useState7 = React.useState({
        modalOpen: false,
        error: null,
        isRequest: false
    }),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        paymentProcessRequest = _React$useState8[0],
        setPaymentProcessRequest = _React$useState8[1];

    var _React$useState9 = React.useState({
        error: null,
        isRequest: false
    }),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        removeFromCartRequest = _React$useState10[0],
        setRemoveFromCartRequest = _React$useState10[1];

    var _React$useState11 = React.useState({
        error: null,
        detailData: null,
        isRequest: false
    }),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        purchaseOrderDetailRequest = _React$useState12[0],
        setPurchaseOrderDetailRequest = _React$useState12[1];

    var _React$useState13 = React.useState(0),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        ongkir = _React$useState14[0],
        setOngkir = _React$useState14[1];

    var _React$useState15 = React.useState(""),
        _React$useState16 = _slicedToArray(_React$useState15, 2),
        otpRefNum = _React$useState16[0],
        setOtpRefNum = _React$useState16[1];

    var _React$useState17 = React.useState(""),
        _React$useState18 = _slicedToArray(_React$useState17, 2),
        otp = _React$useState18[0],
        setOtp = _React$useState18[1];

    var count = productCatalogRequest.count,
        pageCount = productCatalogRequest.pageCount,
        listData = productCatalogRequest.listData,
        pageIndex = productCatalogRequest.pageIndex,
        pageSize = productCatalogRequest.pageSize,
        reload = productCatalogRequest.reload;

    var doFetchData = React.useCallback(function (_ref) {
        var pageSize = _ref.pageSize,
            pageIndex = _ref.pageIndex;

        //     // fetch product
        // Simple POST request with a JSON body using fetch
        var graphqlData = 'query{\n      getAllTokoCartsBySessionId(session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '", page_size: 10, page_index: 0){\n        error,\n        count,\n        page_count,\n        status,\n        is_need_shipping,\n        list_data{\n          _id,\n          product_id{\n            _id,\n            code,\n            price,\n            name,\n            description,\n            image_id{\n              _id,\n              filename,\n              file_type\n            }\n          },\n          toko_id{\n            name\n          },\n          count,\n          amount\n        }\n      }\n    }';
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
            return response.data.getAllTokoCartsBySessionId;
        }).then(function (data) {
            return setProductCatalogRequest({
                listData: data.list_data,
                pageCount: data.page_count,
                isNeedShipping: data.is_need_shipping,
                count: data.count,
                isRequest: false
            });
        });
    }, []);

    var paymentProcess = function paymentProcess() {
        console.log('paymentProcess');
        if (otp === 'undefined' || otp == null) return alert("otp kosong");
        var graphqlData = 'mutation\n    {\n      paymentProcess(\n            session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '",\n            otp: "' + otp + '",\n            otpRefNum: "' + otpRefNum + '"\n          )\n      {\n        status,\n        error,\n        payment_page_url,\n        debitin_paymentpage_backend_baseurl\n      }\n    }';
        console.log("req =====> " + graphqlData);
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
            return response.data.paymentProcess;
        }).then(function (data) {
            if (!data) return;
            setPaymentProcessRequest({ error: data.error, isRequest: false, modalOpen: false });
            console.log('data=====>' + data.error);
            if (data.error) return alert(data.error);
            localStorage.setItem(TOKOONLINE_TOKOID, '' + new Date().getTime());
            window.location.href = data.debitin_paymentpage_backend_baseurl + data.payment_page_url;
        });
    };

    var doSendOtp = function doSendOtp() {
        var graphqlData = 'mutation{\n              paymentProcessSendOtp(email: "' + (checkoutProcessRequest.payload || {}).email + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){\n                status,\n                error,\n                otpRefNum\n              }\n            }';

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
            return response.data.paymentProcessSendOtp;
        }).then(function (data) {
            if (data.error) return alert(data.error);
            setOtpRefNum(data.otpRefNum);
            setPaymentProcessRequest(Object.assign({}, paymentProcessRequest, {
                modalOpen: true
            }));
        });
    };

    React.useEffect(function () {
        doFetchData({ pageSize: pageSize, pageIndex: pageIndex });
    }, [doFetchData, pageIndex, pageSize, reload]);

    var doFetchDetailDataPo = React.useCallback(function () {
        var graphqlData = 'query{\n      getDetailTokoPoBySessionId(session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){\n          error,\n          status,\n          data_detail{\n            _id,\n            email,\n            full_name,\n            invoice_code,\n            phone_number,\n            shipping_address,\n            total_amount,\n            total_product_amount,\n            shipping_amount,\n            shipping_province,\n            shipping_city,\n            shipping_subcity,\n            shipping_currier,\n            shipping_postal_code\n          }\n        }\n      }';
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: graphqlData })
        };
        fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log('getDetailTokoPoBySessionId response===>', response);
            // response.json()
            return response.data.getDetailTokoPoBySessionId;
        }).then(function (data) {
            if (!data) return;
            setPurchaseOrderDetailRequest({ detailData: data.data_detail, isRequest: false, error: null });
            setOngkir((data.data_detail || {}).shipping_amount);
            setCheckoutProcessRequest({
                payload: {
                    full_name: (data.data_detail || {}).full_name,
                    email: (data.data_detail || {}).email,
                    phone_number: (data.data_detail || {}).phone_number,
                    shipping_address: (data.data_detail || {}).shipping_address,
                    shipping_amount: (data.data_detail || {}).shipping_amount,
                    shipping_province: (data.data_detail || {}).shipping_province,
                    shipping_city: (data.data_detail || {}).shipping_city,
                    shipping_subcity: (data.data_detail || {}).shipping_subcity,
                    shipping_currier: (data.data_detail || {}).shipping_currier,
                    shipping_postal_code: (data.data_detail || {}).shipping_postal_code
                }
            });
        });
    }, []);
    React.useEffect(function () {
        doFetchDetailDataPo();
    }, [doFetchDetailDataPo]);
    React.useEffect(function () {
        doFetchDetailDataPo();
    }, [doFetchDetailDataPo]);

    var handleOtp = function handleOtp(e) {
        setOtp(e.target.value);
    };

    var ListView = function ListView(_ref2) {
        var productImage = _ref2.productImage,
            productName = _ref2.productName,
            productPrice = _ref2.productPrice,
            index = _ref2.index,
            amount = _ref2.amount,
            count = _ref2.count,
            productId = _ref2.productId;
        return React.createElement(
            'div',
            { key: index },
            React.createElement(
                ListItem,
                { button: true },
                React.createElement(
                    ListItemAvatar,
                    null,
                    React.createElement(Avatar, {
                        alt: 'Avatar n\xB0' + (index + 1),
                        src: backendBaseUrl + '/renderfile/' + productImage.filename + '.' + productImage.file_type
                    })
                ),
                React.createElement(ListItemText, {
                    primary: productName,
                    secondary: React.createElement(
                        React.Fragment,
                        null,
                        "Qty :  " + count
                    )
                }),
                React.createElement(
                    ListItemSecondaryAction,
                    null,
                    React.createElement(
                        Typography,
                        {
                            component: 'span',
                            variant: 'caption',
                            className: classes.inline,
                            color: 'textPrimary'
                        },
                        convertRupiah(productPrice)
                    )
                )
            ),
            React.createElement(Divider, { component: 'li' })
        );
    };

    var fullName = (purchaseOrderDetailRequest.detailData || {}).full_name;
    console.log('purchaseOrderDetailRequest.detailData======>', fullName);
    var renderTextField = function renderTextField(_ref3) {
        var _React$createElement;

        var name = _ref3.name,
            label = _ref3.label,
            value = _ref3.value,
            defaultValue = _ref3.defaultValue,
            option = _ref3.option,
            row = _ref3.row;
        return React.createElement(
            Grid,
            (_React$createElement = { item: true }, _defineProperty(_React$createElement, 'item', true), _defineProperty(_React$createElement, 'xs', 12), _defineProperty(_React$createElement, 'md', option == "area" ? 12 : 6), _React$createElement),
            React.createElement(TextField, {
                id: name,
                label: label,
                fullWidth: true,
                defaultValue: value,
                value: value,
                multiline: true,
                disabled: true,
                rows: row,
                InputLabelProps: { shrink: true },
                onChange: function onChange(e) {
                    return setCheckoutProcessRequest({
                        payload: Object.assign({}, checkoutProcessRequest.payload, _defineProperty({}, name, e.target.value))
                    });
                }
            })
        );
    };
    var convertRupiah = function convertRupiah(param) {
        var reverse = (param || 0).toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');

        return "Rp. " + ribuan;
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
            Grid,
            { container: true },
            React.createElement(
                Grid,
                { item: true, xs: 12, sm: 12, md: 12, lg: 6 },
                React.createElement(
                    Card,
                    { className: classes.root },
                    React.createElement(
                        CardContent,
                        null,
                        React.createElement(
                            List,
                            null,
                            (listData || []).map(function (v, index) {
                                var amount = v.amount;
                                var count = v.count;
                                var productId = v.product_id._id;
                                var productName = v.product_id.name;
                                var productPrice = v.product_id.price;
                                var productImage = (v.product_id || {}).image_id || {};
                                // const productImage = (v.product_id.image_id || {}).filename}.${(v.image_id || {}).file_type
                                // return ThumbsView({ productName, productPrice, productImage, index })
                                return ListView({
                                    amount: amount,
                                    count: count,
                                    productName: productName,
                                    productPrice: productPrice,
                                    productImage: productImage,
                                    index: index,
                                    productId: productId
                                });
                            }),
                            productCatalogRequest.isNeedShipping == "Y" ? React.createElement(
                                Grid,
                                {
                                    container: true,
                                    direction: 'row',
                                    justify: 'space-between',
                                    alignItems: 'center'
                                },
                                React.createElement(
                                    Typography,
                                    { variant: 'caption',
                                        style: { marginLeft: 16, marginTop: 16 } },
                                    'Ongkir'
                                ),
                                React.createElement(
                                    Typography,
                                    { variant: 'caption', color: 'error',
                                        style: { marginRight: 16, marginTop: 16 } },
                                    convertRupiah(ongkir)
                                )
                            ) : [],
                            React.createElement(
                                Grid,
                                {
                                    container: true,
                                    direction: 'row',
                                    justify: 'space-between',
                                    alignItems: 'center'
                                },
                                React.createElement(
                                    Typography,
                                    { variant: 'subtitle1', style: { marginLeft: 16, marginTop: 16 } },
                                    'Total'
                                ),
                                React.createElement(
                                    Typography,
                                    { variant: 'subtitle1', color: 'error',
                                        style: { marginRight: 16, marginTop: 16 } },
                                    convertRupiah((listData || []).map(function (v, index) {
                                        return v.amount;
                                    }).reduce(function (x, y) {
                                        return parseInt(x) + parseInt(y) + parseInt(ongkir);
                                    }, 0))
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                Grid,
                { item: true, xs: 12, sm: 12, md: 12, lg: 6 },
                React.createElement(
                    Card,
                    { className: classes.root },
                    React.createElement(
                        CardContent,
                        null,
                        React.createElement(
                            Typography,
                            { variant: 'h6', gutterBottom: true },
                            'Customer Data'
                        ),
                        React.createElement(
                            Grid,
                            { container: true, spacing: 2 },
                            renderTextField({
                                name: 'full_name',
                                label: 'Nama *',
                                value: (checkoutProcessRequest.payload || {}).full_name,
                                defaultValue: ''
                            }),
                            renderTextField({
                                name: 'phone_number',
                                label: 'Nomor Telepon *',
                                value: (checkoutProcessRequest.payload || {}).phone_number,
                                defaultValue: ''
                            }),
                            renderTextField({
                                name: 'email',
                                label: 'Email *',
                                value: (checkoutProcessRequest.payload || {}).email,
                                defaultValue: ''
                            }),
                            productCatalogRequest.isNeedShipping == "Y" ? renderTextField({
                                name: 'shipping_province',
                                label: 'Provinsi *',
                                value: (checkoutProcessRequest.payload || {}).shipping_province,
                                defaultValue: ''
                            }) : [],
                            productCatalogRequest.isNeedShipping == "Y" ? renderTextField({
                                name: 'shipping_city',
                                label: 'Kota *',
                                value: (checkoutProcessRequest.payload || {}).shipping_city,
                                defaultValue: ''
                            }) : [],
                            productCatalogRequest.isNeedShipping == "Y" ? renderTextField({
                                name: 'shipping_subcity',
                                label: 'Kecamatan *',
                                value: (checkoutProcessRequest.payload || {}).shipping_subcity,
                                defaultValue: ''
                            }) : [],
                            productCatalogRequest.isNeedShipping == "Y" ? renderTextField({
                                name: 'shipping_postal_code',
                                label: 'Kode pos',
                                value: (checkoutProcessRequest.payload || {}).shipping_postal_code,
                                defaultValue: ''
                            }) : [],
                            productCatalogRequest.isNeedShipping == "Y" ? renderTextField({
                                name: 'shipping_currier',
                                label: 'Layanan kurir *',
                                value: (checkoutProcessRequest.payload || {}).shipping_currier,
                                defaultValue: ''
                            }) : [],
                            renderTextField({
                                name: 'shipping_address',
                                label: 'Alamat lengkap *',
                                option: 'area',
                                value: (checkoutProcessRequest.payload || {}).shipping_address,
                                defaultValue: '-'
                            })
                        )
                    ),
                    React.createElement(
                        CardActions,
                        null,
                        React.createElement(
                            Button,
                            {
                                style: { margin: 8 },
                                size: 'small',
                                variant: 'outlined',
                                onClick: function onClick() {
                                    window.location.href = TOKOONLINE_PAGE_SHOPPING_CART;
                                }, className: classes.button },
                            'Keranjang'
                        ),
                        React.createElement(
                            Button,
                            {
                                style: { margin: 8 },
                                size: 'small',
                                variant: 'contained', color: 'primary', disableElevation: true
                                // onClick={() => setPaymentProcessRequest({
                                //     ...paymentProcessRequest,
                                //     modalOpen: true
                                // })}
                                , onClick: doSendOtp,
                                className: classes.button
                            },
                            'Checkout'
                        )
                    )
                )
            )
        ),
        React.createElement(
            Modal,
            {
                open: paymentProcessRequest.modalOpen,
                onClose: function onClose() {
                    return setPaymentProcessRequest(Object.assign({}, paymentProcessRequest, { modalOpen: false }));
                },
                'aria-labelledby': 'transition-modal-title',
                'aria-describedby': 'transition-modal-description',
                disableBackdropClick: true,
                BackdropComponent: Backdrop,
                BackdropProps: {
                    timeout: 500
                },
                className: classes.modal
            },
            React.createElement(
                Fade,
                { 'in': paymentProcessRequest.modalOpen },
                React.createElement(
                    'div',
                    { className: classes.paper },
                    React.createElement(
                        Grid,
                        { container: true, spacing: 2, direction: 'column', justify: 'center',
                            alignItems: 'center' },
                        React.createElement(
                            'h2',
                            { id: 'simple-modal-title' },
                            'Konfirmasi'
                        ),
                        React.createElement(
                            'p',
                            { id: 'simple-modal-description' },
                            'Masukkan kode otp yang dikirimkan ke email anda'
                        ),
                        React.createElement(TextField, { onChange: handleOtp, id: 'outlined-basic', label: 'OTP', variant: 'outlined',
                            style: { maxWidth: 70 } }),
                        React.createElement(
                            Grid,
                            {
                                container: true,
                                direction: 'row',
                                justify: 'space-around',
                                alignItems: 'center',
                                style: { marginTop: 20 }
                            },
                            React.createElement(
                                Button,
                                { type: 'button', size: 'small', color: 'secondary',
                                    onClick: function onClick() {
                                        return setPaymentProcessRequest(Object.assign({}, paymentProcessRequest, {
                                            modalOpen: false
                                        }));
                                    } },
                                'Batal'
                            ),
                            React.createElement(
                                Button,
                                { type: 'button', size: 'small', color: 'primary', onClick: function onClick() {
                                        return paymentProcess();
                                    } },
                                'Ok'
                            )
                        )
                    )
                )
            )
        )
    );
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#tokoonline_content'));