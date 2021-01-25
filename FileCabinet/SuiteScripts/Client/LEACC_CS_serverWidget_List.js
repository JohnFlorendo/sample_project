/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope Public
 */

/*
ID : 
Name : 
Purpose : Survey
Created On : 
Author : Lea Columna
Script Type : Client Script
Saved Searches : NONE
*/
var selectAmount = 0;
define(['N/search', 'N/currentRecord', 'N/ui/dialog', 'N/format','N/record','N/url'], function(search, currentRecord, dialog, format,objrecord,url) {
    var record = currentRecord.get();
    function pageInit(){}
    function fieldChanged(context){
       if(context.fieldId === 'custpage_select_search'){
        var searchField = record.getText('custpage_select_search');
        record.setValue('custpage_select_searchname',searchField);
       }
        
    }
    function onclickBack (){
        var output = url.resolveScript({
            scriptId: 'customscript173',
            deploymentId: 'customdeploy1',
            returnExternalUrl: false
        });
        window.location = "https://1563405.app.netsuite.com/app/site/hosting/scriptlet.nl?script=173&deploy=1";
    }

    function onclickShowValues(){
        var datatable = Array.prototype.map.call(document.querySelectorAll('#div__bodytab tr'), function(tr){
            return Array.prototype.map.call(tr.querySelectorAll('td'), function(td){
              return td.innerHTML;
              });
            });
            datatable =  datatable.splice(1,datatable.length-2);
            console.log(datatable);
    }
    
    function onclickgetCurrentPage(){
        var currentPage = currentRecord.get();
      console.log(currentPage);
      
        
    }




    return {
        pageInit :pageInit,
        fieldChanged: fieldChanged,
        onclickBack :onclickBack,
        onclickShowValues : onclickShowValues,
        onclickgetCurrentPage : onclickgetCurrentPage
    };
});