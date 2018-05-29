const info = {
    page: "paid.html",
    path: "/report/paid/"
};
Object.freeze(info);

$(window).ready(function () {
    scope = angular.element(document.getElementById("ng-app")).scope();
});

// const loadMore = function () {
//     scope.$apply(function () {
//         var _this = scope.vm;
//         _this.mode.report.getting = false;
//         _this.mode.report.loaded = true;
//         _this.reportData.limit.min += _this.reportData.maxChunkSize;
//         _this.reportData.limit.max += _this.reportData.maxChunkSize;
//         console.log(_this.reportData);
//         _this.$http({
//             method: "GET",
//             url: "/ugc_serv/report/paid/?use_or=" + decodeURI(_this.filter.use_or)
//                 + "&fileNum=" + decodeURI(_this.filter.fileNum.selected.join(";,;"))
//                 + "&masterFileNum=" + decodeURI(_this.filter.masterFileNum.selected.join(";,;"))
//                 + "&collegeId=" + decodeURI(_this.filter.college.selected.join(";,;"))
//                 + "&year=" + decodeURI(_this.filter.year.selected.join(";,;"))
//                 + "&paid=" + decodeURI(_this.filter.paid.min) + ";,;" + decodeURI(_this.filter.paid.max)
//                 + "&uc=" + decodeURI(_this.filter.uc.min) + ";,;" + decodeURI(_this.filter.uc.max)
//                 + "&scheme=" + decodeURI(_this.filter.scheme.selected.join(";,;"))
//                 + "&subScheme=" + decodeURI(_this.filter.subScheme.selected.join(";,;"))
//                 + "&plan=" + decodeURI(_this.filter.plan.selected.join(";,;"))
//                 + "&limit=" + _this.reportData.limit.min + ";,;" + _this.reportData.maxChunkSize
//         }).then(function successCallback(response) {
//             // dataTable = $('#dataTable').DataTable({
//             //     "deferRender": true,
//             //     "lengthMenu": [50],
//             //     "destroy": true,
//             // });
//             console.log(response.data.data.length);
//             for (var i = 0; i < response.data.data.length; i++) {
//                 dataTable.row.add(response.data.data[i]).draw(false);
//             }
//             // document.getElementById("dataTable_info").style.cssFloat = "left";
//             // document.getElementById("dataTable_info").parentNode.innerHTML += '<div style="text-align: left; float: right;">\
//             // <ul style="list-style-type:none;">\
//             //     <li id="dataTable_loadMore" class="paginate_button page-item"><a aria-controls="dataTable" data-dt-idx="8" tabindex="0" class="page-link" onClick="loadMore();">Load More</a></li></ul>\
//             // </div>';
//             _this.mode.report.getting = false;
//             _this.mode.report.loaded = true;
//         }, function errorCallback(response) {
//             _this.mode.report.getting = false;
//             _this.mode.report.loaded = false;
//             _this.httpResponseError(response);
//         });
//     });
// };