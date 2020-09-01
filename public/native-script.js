// window.MerchantCreatePageComponentComponentWillMount = function () {
//   $('body').attr('class', 'hold-transition skin-blue sidebar-mini')
//     console.log('MerchantCreatePageComponentComponentWillMount')
// }
// window.MerchantCreatePageComponentComponentDidMount = function () {
//   $('body').attr('class', 'hold-transition skin-blue sidebar-mini')
//     $('.select2').select2()
//   console.log('MerchantCreatePageComponentComponentDidMount')
// }
// window.HomePageComponent = function () {
//   // $('body').attr('class', 'hold-transition skin-blue sidebar-mini');
// }
// window.LoginPageComponent = function () {
//   // $('body').attr('class', 'hold-transition login-page');
//   // $('input').iCheck({
//   //   checkboxClass: 'icheckbox_square-blue',
//   //   radioClass: 'iradio_square-blue',
//   //   increaseArea: '20%' /* optional */
//   // });
// }

// $(function () {
//   console.log('native-script')
//   if ((window.location.pathname).includes('/login')) {
//     console.log(window.location.pathname)
//     $('input').iCheck({
//       checkboxClass: 'icheckbox_square-blue',
//       radioClass: 'iradio_square-blue',
//       increaseArea: '20%' /* optional */
//     })
//   } else {
//   }
// })

$('#transactionStartdateMin').datepicker({
    autoclose: true
})
$('#transactionStartdateMax').datepicker({
    autoclose: true
})

