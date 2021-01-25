/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */
define([ 'N/log', 'N/runtime', 'N/search', 'N/error', 'N/currentRecord', 'N/url' ], function(log, runtime, search, error, currentRecord, url)
{
    var SL_ID_POP = 'customscript_poc_sl_podetails';
    var SL_DEPLOY_POPUP = 'customdeploy_poc_sl_podetails';
    var ST_OLD_ITEM = '';

    function showPopup()
    {
        try
        {
            if (runtime.executionContext == 'USERINTERFACE')
            {
                var stSLUrl = createSuiteletURL();
                log.debug('stSLUrl', stSLUrl);
                window.open(stSLUrl, 'Please select Item and input Memo', '_target=blank,width=700,height=300');
            }
        }
        catch (e)
        {
            if (e.message != undefined)
            {
                log.error('ERROR', e.name + ' ' + e.message);
                throw e.name + ' ' + e.message;
            }
            else
            {
                log.error('ERROR', 'Unexpected Error', e.toString());
                throw error.create({
                    name : '99999',
                    message : e.toString()
                });
            }
        }
    }

    function createSuiteletURL()
    {
        var scheme = 'https://';
        var host = window.location.hostname;
        var relativePath = url.resolveScript({
            scriptId : SL_ID_POP,
            deploymentId : SL_DEPLOY_POPUP,
            returnExternalUrl : false
        });

        var slUrl = scheme + host + relativePath;
        return slUrl;
    }

    function saveRecord(context)
    {
        debugger;

        var objCurrRec = currentRecord.get();
        var stItem = objCurrRec.getValue({
            fieldId : 'custpage_item'
        });

        var bIsSave = false;

        if (stItem == '')
        {
            bIsSave = confirm('No item selected. Proceed?');
        }
        else
        {
            bIsSave = true;
        }

        var stMemo = objCurrRec.getValue({
            fieldId : 'custpage_memo'
        });

        if (bIsSave && stMemo == '')
        {
            bIsSave = confirm('No memo inputted. Proceed?');
        }
        else
        {
            bIsSave = true;
        }

        if (bIsSave)
        {
            if (stItem != '')
            {
                window.opener.nlapiSelectNewLineItem('item');
                window.opener.nlapiSetCurrentLineItemValue('item', 'item', stItem);
            }

            if (stMemo != '')
            {
                window.opener.nlapiSetFieldValue('memo', stMemo);
            }

            window.onbeforeunload = function()
            {
            };

            window.close();
        }
    }

    function inArray(arr, val)
    {
        var bIsInArray = false;

        for (var i = 0; i < arr.length; i++)
        {
            if (arr[i] == val)
            {
                bIsInArray = true;
                break;
            }
        }

        return bIsInArray;
    }

    return {
        showPopup : showPopup,
        saveRecord : saveRecord
    };
});
