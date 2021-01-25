/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */
define([ 'N/log', 'N/runtime', 'N/search', 'N/error', 'N/currentRecord', 'N/url', 'N/https' ], function(log, runtime, search, error, currentRecord, url, https)
{
    function fieldChanged(context)
    {
        var eventType = context.type;

        try
        {
            if (runtime.executionContext == 'USERINTERFACE')
            {
                var objCurrRec = currentRecord.get();

                if (context.fieldId == 'custpage_google_apis')
                {
                    var stAction = objCurrRec.getValue({
                        fieldId : 'custpage_google_apis'
                    });

                    switch (stAction)
                    {
                        case 'url_shortener':
                            var objFld = objCurrRec.getField({
                                fieldId : 'custpage_short_url'
                            });

                            objFld.isDisabled = true;

                            var objFld = objCurrRec.getField({
                                fieldId : 'custpage_long_url'
                            });

                            objFld.isDisabled = false;

                            break;

                        case 'url_shortener':
                            var objFld = objCurrRec.getField({
                                fieldId : 'custpage_short_url'
                            });

                            objFld.isDisabled = false;

                            var objFld = objCurrRec.getField({
                                fieldId : 'custpage_long_url'
                            });

                            objFld.isDisabled = true;

                            break;

                        default:
                            var objFld = objCurrRec.getField({
                                fieldId : 'custpage_short_url'
                            });

                            objFld.isDisabled = true;

                            var objFld = objCurrRec.getField({
                                fieldId : 'custpage_long_url'
                            });

                            objFld.isDisabled = true;

                            break;
                    }
                }
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

    function doReveal()
    {
        debugger;

        try
        {
            var objCurrRec = currentRecord.get();

            var stUrlToReveal = objCurrRec.getValue({
                fieldId : 'custpage_short_url'
            });

            var objOptions = {};
            objOptions.url = 'https://www.googleapis.com/urlshortener/v1/url?shortUrl=' + stUrlToReveal;
            objOptions.headers = {
                'Content-type' : 'application/json',
                'Accept' : '*/*'
            }

            var objResp = https.get(objOptions);
        }
        catch (e)
        {
            alert('An error occurred during the revealing. Error message: ' + JSON.stringify(e));
        }
    }

    function doSnip()
    {
        debugger;

        try
        {
            var objCurrRec = currentRecord.get();

            var stUrlToSnip = objCurrRec.getValue({
                fieldId : 'custpage_long_url'
            });

            var objOptions = {};
            objOptions.url = 'https://www.googleapis.com/urlshortener/v1/url';
            objOptions.body = {
                'longUrl' : stUrlToSnip
            };
            objOptions.headers = {
                'Content-type' : 'application/json',
                'Accept' : '*/*'
            }

            var objResp = https.post(objOptions);
        }
        catch (e)
        {
            alert('An error occurred during the snipping. Error message: ' + JSON.stringify(e));
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
        fieldChanged : fieldChanged,
        doReveal : doReveal,
        doSnip : doSnip
    };
});
