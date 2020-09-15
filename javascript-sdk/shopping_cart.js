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
    List = _MaterialUI.List,
    Divider = _MaterialUI.Divider,
    FormControl = _MaterialUI.FormControl,
    InputLabel = _MaterialUI.InputLabel,
    Select = _MaterialUI.Select,
    MenuItem = _MaterialUI.MenuItem,
    FormHelperText = _MaterialUI.FormHelperText,
    CircularProgress = _MaterialUI.CircularProgress,
    Switch = _MaterialUI.Switch;


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
        }
    };
});

// class App extends React.Component {
var totalAmount = 0;

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
        isNeedShipping: null,
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
        isRequest: false,
        detailData: {}
    }),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        checkoutProcessRequest = _React$useState6[0],
        setCheckoutProcessRequest = _React$useState6[1];

    var _React$useState7 = React.useState({
        error: null,
        isRequest: false
    }),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        removeFromCartRequest = _React$useState8[0],
        setRemoveFromCartRequest = _React$useState8[1];

    var _React$useState9 = React.useState({
        error: null,
        detailData: null,
        isRequest: false
    }),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        purchaseOrderDetailRequest = _React$useState10[0],
        setPurchaseOrderDetailRequest = _React$useState10[1];

    var _React$useState11 = React.useState(0),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        ongkir = _React$useState12[0],
        setOngkir = _React$useState12[1];

    var _React$useState13 = React.useState([]),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        provinsiData = _React$useState14[0],
        setProvinsiData = _React$useState14[1];

    var _React$useState15 = React.useState(null),
        _React$useState16 = _slicedToArray(_React$useState15, 2),
        provinsi = _React$useState16[0],
        setProvinsi = _React$useState16[1];

    var _React$useState17 = React.useState([]),
        _React$useState18 = _slicedToArray(_React$useState17, 2),
        kotaData = _React$useState18[0],
        setKotaData = _React$useState18[1];

    var _React$useState19 = React.useState(null),
        _React$useState20 = _slicedToArray(_React$useState19, 2),
        kota = _React$useState20[0],
        setKota = _React$useState20[1];

    var _React$useState21 = React.useState(null),
        _React$useState22 = _slicedToArray(_React$useState21, 2),
        subcity = _React$useState22[0],
        setSubcity = _React$useState22[1];

    var _React$useState23 = React.useState([]),
        _React$useState24 = _slicedToArray(_React$useState23, 2),
        layananKurir = _React$useState24[0],
        setLayananKurir = _React$useState24[1];

    var _React$useState25 = React.useState([]),
        _React$useState26 = _slicedToArray(_React$useState25, 2),
        subcityData = _React$useState26[0],
        setSubcityData = _React$useState26[1];

    var _React$useState27 = React.useState(""),
        _React$useState28 = _slicedToArray(_React$useState27, 2),
        kurir = _React$useState28[0],
        setKurir = _React$useState28[1];

    var _React$useState29 = React.useState(0),
        _React$useState30 = _slicedToArray(_React$useState29, 2),
        weight = _React$useState30[0],
        setWeight = _React$useState30[1];

    var count = productCatalogRequest.count,
        pageCount = productCatalogRequest.pageCount,
        listData = productCatalogRequest.listData,
        pageIndex = productCatalogRequest.pageIndex,
        pageSize = productCatalogRequest.pageSize,
        reload = productCatalogRequest.reload;

    var _React$useState31 = React.useState({
        originProv: null,
        originCity: null,
        originSubcity: null
    }),
        _React$useState32 = _slicedToArray(_React$useState31, 2),
        originRequest = _React$useState32[0],
        setOriginRequest = _React$useState32[1];

    var originProv = originRequest.originProv,
        originCity = originRequest.originCity,
        originSubcity = originRequest.originSubcity;

    var doFetchData = React.useCallback(function (_ref) {
        var pageSize = _ref.pageSize,
            pageIndex = _ref.pageIndex;

        //     // fetch product
        // Simple POST request with a JSON body using fetch
        var graphqlData = 'query{\n      getAllTokoCartsBySessionId(session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '", page_size: 10, page_index: 0){\n        error,\n        count,\n        page_count,\n        status,\n        is_need_shipping,\n        list_data{\n          _id,\n          product_id{\n            _id,\n            code,\n            price,\n            name,\n            description,\n            image_id{\n              _id,\n              filename,\n              file_type\n            },\n            weight\n          },\n          toko_id{\n            name,\n            province,\n            city,\n            subcity\n          },\n          count,\n          amount\n        }\n      }\n    }';
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: graphqlData })
        };
        fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log('response getAllTokoCartsBySessionId===>', response);
            // response.json()
            return response.data.getAllTokoCartsBySessionId;
        }).then(function (data) {
            setProductCatalogRequest({
                listData: data.list_data,
                pageCount: data.page_count,
                isNeedShipping: data.is_need_shipping,
                count: data.count,
                isRequest: false
            });
            setWeight((data.list_data || []).map(function (key) {
                return parseFloat(key.product_id.weight) * key.count;
            }).reduce(function (x, y) {
                return parseFloat(x) + parseFloat(y);
            }, 0));
            if (data.list_data.length !== 0) {
                setOriginRequest({
                    originProv: data.list_data[0].toko_id.province,
                    originCity: data.list_data[0].toko_id.city,
                    originSubcity: data.list_data[0].toko_id.subcity
                });
            }
        });
    }, []);
    var doAddToCart = function doAddToCart(_ref2) {
        var productId = _ref2.productId;

        var graphqlData = 'mutation{addToCart( toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n                          code,\n                          price,\n                          description,\n                          image_id{\n                            _id,\n                            filename,\n                            file_type\n                          }\n                        }\n                        count,\n                        amount,\n                        device_id,\n                        session_id,\n                        toko_id{\n                          slug\n                        }\n                      }\n                    }\n                    }';
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
            if (data.error) alert(data.error);else setProductCatalogRequest({ reload: reload + 1 });
            // if (!data.error) window.location.href = TOKOONLINE_PAGE_SHOPPING_CART
            // else alert(data.error)
        });
    };
    var buttonDecProductCount = function buttonDecProductCount(_ref3) {
        var productId = _ref3.productId;

        // alert(productId)
        // return
        var graphqlData = 'mutation{removeFromCart(  toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n              code,\n              price,\n              description,\n              image_id{\n                _id,\n                filename,\n                file_type\n              }\n            }\n            count,\n            device_id,\n            session_id,\n            toko_id{\n              slug\n            }\n          }\n        }\n      }';
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
            return response.data.removeFromCart;
        }).then(function (data) {
            if (!data) return;
            setRemoveFromCartRequest({ error: data.error, isRequest: false });

            if (data.error) alert(data.error);else setProductCatalogRequest({ reload: reload + 1 });
        });
    };
    var checkoutProcess = function checkoutProcess(_ref4) {
        var payload = _ref4.payload;

        var graphqlData = 'mutation\n            {\n              checkoutProcess(\n                    session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '",\n                    device_id: "xxxx",\n                    full_name: "' + payload.full_name + '",\n                    phone_number: "' + payload.phone_number + '",\n                    email: "' + payload.email + '",\n                    cart_id: ' + JSON.stringify(productCatalogRequest.listData.map(function (v) {
            return '' + v._id;
        })) + ',\n                    toko_id: "' + TOKOONLINE_TOKOID + '",\n                    shipping_address: "' + payload.shipping_address + '",\n                    shipping_province: "' + provinsi.province + '",\n                    shipping_city: "' + kota.city_name + '",\n                    shipping_subcity: "' + subcity.subdistrict_name + '",\n                    shipping_currier: "' + (kurir == undefined ? "" : kurir.toUpperCase() + " - " + kurirservis.service) + '",\n                    shipping_postal_code: "' + payload.shipping_postal_code + '",\n                    shipping_amount: ' + ongkir + '\n                  )\n              {\n                status,\n                error,\n                detail_data\n                {\n                  _id\n                }\n              }\n            }';
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: graphqlData })
        };
        console.log("graphqlData : " + graphqlData);
        fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
            return response.json();
        }).then(function (response) {
            if (response.errors) return alert(JSON.stringify(response.errors));
            return response.data.checkoutProcess;
        }).then(function (data) {
            if (!data) return;
            var error = data.error;
            setCheckoutProcessRequest({ error: error, isRequest: false, payload: checkoutProcessRequest.payload });
            if (error) alert(error);else window.location.href = TOKOONLINE_PAGE_CHECKOUT_CONFIRMATION + '#' + data.detail_data._id;
            // console.log('data=====>' + data)
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
            // console.log('getDetailTokoPoBySessionId response===>', response)
            // response.json()
            return response.data.getDetailTokoPoBySessionId;
        }).then(function (data) {
            if (!data) return;
            setPurchaseOrderDetailRequest({ detailData: data.data_detail, isRequest: false, error: null });
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

    var doFetchProvinsi = React.useCallback(function () {
        fetch("https://market-studio.plink.co.id/api/v1/fetchdata-province", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(function (res) {
            return res.json();
        }).then(function (result) {
            if (result.rajaongkir.status.code === 200) {
                setProvinsiData(result.rajaongkir.results);
            }
        }, function (error) {
            console.log("error1 : " + JSON.stringify(error));
        });
    }, []);

    React.useEffect(function () {
        doFetchProvinsi();
    }, [doFetchProvinsi]);

    var handleProvince = function handleProvince(event) {
        console.log(event);
        setProvinsi(event.target.value);
        fetch("https://market-studio.plink.co.id/api/v1/fetchdata-city?province=" + event.target.value.province_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(function (res) {
            return res.json();
        }).then(function (result) {
            setKotaData(result.rajaongkir.results);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };

    var handleCity = function handleCity(event) {
        setKota(event);
        fetch("https://market-studio.plink.co.id/api/v1/fetchdata-subcity?city=" + event.city_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(function (res) {
            return res.json();
        }).then(function (result) {
            console.log("kec:" + JSON.stringify(result));
            setSubcityData(result.rajaongkir.results);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };

    var handleSubcity = function handleSubcity(event) {
        setSubcity(event);
    };

    var _React$useState33 = React.useState(null),
        _React$useState34 = _slicedToArray(_React$useState33, 2),
        kurirservis = _React$useState34[0],
        setKurirservis = _React$useState34[1];

    var handleKurir = function handleKurir(event) {
        if (subcity === null) return;
        if (weight == 0) return;
        setKurir(event);
        var countDistanceRequest = {
            origin: originRequest.originSubcity,
            originType: "subdistrict",
            destination: subcity.subdistrict_id,
            destinationType: 'subdistrict',
            weight: weight * 1000,
            courier: event
        };
        console.log("countDistanceRequest " + JSON.stringify(countDistanceRequest));
        fetch("https://market-studio.plink.co.id/api/v1/fetchdata-cost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(countDistanceRequest)
        }).then(function (res) {
            return res.json();
        }).then(function (result) {
            console.log("result" + JSON.stringify(result));
            setLayananKurir(result.rajaongkir.results[0].costs);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };

    var handleOngkir = function handleOngkir(event) {
        setOngkir(event.target.value.cost[0].value);
        setKurirservis(event.target.value);
    };

    React.useEffect(function () {
        {
            productCatalogRequest.isNeedShipping == "Y" && kurir != '' ? handleKurir() : {};
        }
    }, [weight]);

    var ListView = function ListView(_ref5) {
        var productImage = _ref5.productImage,
            productName = _ref5.productName,
            productPrice = _ref5.productPrice,
            index = _ref5.index,
            amount = _ref5.amount,
            count = _ref5.count,
            productId = _ref5.productId;
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
                        React.createElement(
                            Button,
                            { size: 'small',
                                onClick: function onClick() {
                                    return buttonDecProductCount({ productId: productId });
                                } },
                            '-'
                        ),
                        "  " + count + "  ",
                        React.createElement(
                            Button,
                            { size: 'small', onClick: function onClick() {
                                    return doAddToCart({ productId: productId });
                                } },
                            '+'
                        )
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

    var convertRupiah = function convertRupiah(param) {
        var reverse = param.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');

        return "Rp. " + ribuan;
    };

    var fullName = (purchaseOrderDetailRequest.detailData || {}).full_name;
    // console.log('purchaseOrderDetailRequest.detailData======>', fullName)
    var renderTextField = function renderTextField(_ref6) {
        var _React$createElement;

        var name = _ref6.name,
            label = _ref6.label,
            value = _ref6.value,
            defaultValue = _ref6.defaultValue,
            option = _ref6.option,
            row = _ref6.row;
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
                            ) : React.createElement(Grid, null),
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
                                    convertRupiah(ongkir + (listData || []).map(function (v, index) {
                                        return v.amount;
                                    }).reduce(function (x, y) {
                                        return parseInt(x) + parseInt(y);
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
                                value: (checkoutProcessRequest.payload || {}).full_name
                            }),
                            renderTextField({
                                name: 'phone_number',
                                label: 'Nomor Telepon *',
                                value: (checkoutProcessRequest.payload || {}).phone_number
                            }),
                            renderTextField({
                                name: 'email',
                                label: 'Email *',
                                option: 'area',
                                value: (checkoutProcessRequest.payload || {}).email
                            })
                        ),
                        productCatalogRequest.isNeedShipping == "Y" ? React.createElement(
                            Grid,
                            { container: true, spacing: 2, style: { marginTop: 8 } },
                            React.createElement(
                                Grid,
                                { item: true, xs: 12, md: 6 },
                                React.createElement(
                                    FormControl,
                                    { className: classes.formControl, fullWidth: true },
                                    React.createElement(
                                        InputLabel,
                                        { id: 'demo-simple-select-helper-label' },
                                        'Provinsi *'
                                    ),
                                    React.createElement(
                                        Select,
                                        {
                                            labelId: 'demo-simple-select-helper-label',
                                            id: 'demo-simple-select-helper',
                                            value: provinsi,
                                            onChange: handleProvince
                                        },
                                        provinsiData.map(function (prov) {
                                            return React.createElement(
                                                MenuItem,
                                                { key: prov.province_id,
                                                    value: prov },
                                                prov.province
                                            );
                                        })
                                    ),
                                    React.createElement(
                                        FormHelperText,
                                        null,
                                        'Pilih provinsi'
                                    )
                                )
                            ),
                            React.createElement(
                                Grid,
                                { item: true, xs: 12, md: 6 },
                                React.createElement(
                                    FormControl,
                                    { className: classes.formControl, fullWidth: true },
                                    React.createElement(
                                        InputLabel,
                                        { id: 'demo-simple-select-helper-label' },
                                        'Kabupaten *'
                                    ),
                                    React.createElement(
                                        Select,
                                        {
                                            labelId: 'demo-simple-select-helper-label',
                                            id: 'demo-simple-select-helper',
                                            value: kota,
                                            onChange: function onChange(event) {
                                                return handleCity(event.target.value);
                                            }
                                        },
                                        kotaData.map(function (city) {
                                            return React.createElement(
                                                MenuItem,
                                                { key: city.city_id, value: city },
                                                city.city_name
                                            );
                                        })
                                    ),
                                    React.createElement(
                                        FormHelperText,
                                        null,
                                        'Pilih kota'
                                    )
                                )
                            ),
                            React.createElement(
                                Grid,
                                { item: true, xs: 12, md: 6 },
                                React.createElement(
                                    FormControl,
                                    { className: classes.formControl, fullWidth: true },
                                    React.createElement(
                                        InputLabel,
                                        { id: 'demo-simple-select-helper-label' },
                                        'Kecamatan *'
                                    ),
                                    React.createElement(
                                        Select,
                                        {
                                            labelId: 'demo-simple-select-helper-label',
                                            id: 'demo-simple-select-helper',
                                            value: subcity,
                                            onChange: function onChange(event) {
                                                return handleSubcity(event.target.value);
                                            }
                                        },
                                        subcityData.map(function (city) {
                                            return React.createElement(
                                                MenuItem,
                                                { key: city.subdistrict_id, value: city },
                                                city.subdistrict_name
                                            );
                                        })
                                    ),
                                    React.createElement(
                                        FormHelperText,
                                        null,
                                        'Pilih kecamatan'
                                    )
                                )
                            ),
                            renderTextField({
                                name: 'shipping_postal_code',
                                label: 'Kode pos',
                                value: checkoutProcessRequest.payload.shipping_postal_code == 'undefined' ? '' : (checkoutProcessRequest.payload || '').shipping_postal_code
                            }),
                            React.createElement(
                                Grid,
                                { item: true, xs: 12, md: 6 },
                                React.createElement(
                                    FormControl,
                                    { className: classes.formControl, fullWidth: true },
                                    React.createElement(
                                        InputLabel,
                                        { id: 'demo-simple-select-helper-label' },
                                        'Kurir *'
                                    ),
                                    React.createElement(
                                        Select,
                                        {
                                            labelId: 'demo-simple-select-helper-label',
                                            id: 'demo-simple-select-helper',
                                            value: kurir,
                                            onChange: function onChange(event) {
                                                return handleKurir(event.target.value);
                                            }
                                        },
                                        React.createElement(
                                            MenuItem,
                                            {
                                                name: 'jne',
                                                value: 'jne'
                                            },
                                            'JNE'
                                        ),
                                        React.createElement(
                                            MenuItem,
                                            {
                                                name: 'pos',
                                                value: 'pos'
                                            },
                                            'POS'
                                        ),
                                        React.createElement(
                                            MenuItem,
                                            {
                                                name: 'tiki',
                                                value: 'tiki'
                                            },
                                            'TIKI'
                                        )
                                    ),
                                    React.createElement(
                                        FormHelperText,
                                        null,
                                        'Pilih Kurir'
                                    )
                                )
                            ),
                            React.createElement(
                                Grid,
                                { item: true, xs: 12, md: 6 },
                                React.createElement(
                                    FormControl,
                                    { className: classes.formControl, fullWidth: true },
                                    React.createElement(
                                        InputLabel,
                                        { id: 'demo-simple-select-helper-label' },
                                        'Layanan Kurir *'
                                    ),
                                    React.createElement(
                                        Select,
                                        {
                                            labelId: 'demo-simple-select-helper-label',
                                            id: 'demo-simple-select-helper',
                                            value: kurirservis,
                                            onChange: handleOngkir
                                        },
                                        (layananKurir || []).map(function (layanan) {
                                            return React.createElement(
                                                MenuItem,
                                                {
                                                    key: layanan.service,
                                                    name: layanan.service,
                                                    value: layanan
                                                },
                                                layanan.service
                                            );
                                        })
                                    ),
                                    React.createElement(
                                        FormHelperText,
                                        null,
                                        'Pilih Layanan Kurir'
                                    )
                                )
                            )
                        ) : React.createElement(Grid, null),
                        React.createElement(
                            Grid,
                            { container: true, spacing: 2 },
                            renderTextField({
                                name: 'shipping_address',
                                label: 'Alamat lengkap *',
                                option: 'area',
                                row: 4,
                                value: (checkoutProcessRequest.payload || {}).shipping_address
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
                                    window.location.href = TOKOONLINE_PAGE_PRODUCT_CATALOG;
                                }, className: classes.button },
                            'Katalog'
                        ),
                        React.createElement(
                            Button,
                            {
                                style: { margin: 8 },
                                size: 'small',
                                variant: 'contained', color: 'primary', disableElevation: true,
                                onClick: function onClick() {
                                    return checkoutProcess({ payload: checkoutProcessRequest.payload });
                                },
                                className: classes.button
                            },
                            'Lanjutkan'
                        )
                    )
                )
            )
        )
    );
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#tokoonline_content'));