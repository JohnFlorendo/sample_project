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

                if (context.fieldId == 'custpage_trello_tasks')
                {
                    var stTrelloAction = objCurrRec.getValue({
                        fieldId : 'custpage_trello_tasks'
                    });

                    switch (stTrelloAction)
                    {
                        case 'create_card':
                            var objFld = objCurrRec.getField({
                                fieldId : 'custpage_card_list'
                            });

                            objFld.isDisabled = false;

                            objFld = objCurrRec.getField({
                                fieldId : 'custpage_card_name'
                            });

                            objFld.isDisabled = false;

                            objFld = objCurrRec.getField({
                                fieldId : 'custpage_card_desc'
                            });

                            objFld.isDisabled = false;

                            break;

                        default:
                            var objFld = objCurrRec.getField({
                                fieldId : 'custpage_card_list'
                            });

                            objFld.isDisabled = true;

                            objFld = objCurrRec.getField({
                                fieldId : 'custpage_card_name'
                            });

                            objFld.isDisabled = true;

                            objFld = objCurrRec.getField({
                                fieldId : 'custpage_card_desc'
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

    function saveRecord(context)
    {
        debugger;

        var objCurrRec = currentRecord.get();
        var stItem = objCurrRec.getValue({
            fieldId : 'custpage_item'
        });

        var bIsSave = false;

        var success = function(successMsg)
        {
            console.log('success');
        };

        var error = function(errorMsg)
        {
            console.log(errorMsg);
        };

        var stCardName = objCurrRec.getValue({
            fieldId : 'custpage_card_name'
        });

        var stCardDesc = objCurrRec.getValue({
            fieldId : 'custpage_card_desc'
        });

        var stList = objCurrRec.getValue({
            fieldId : 'custpage_card_list'
        });

        try
        {
            var objNewCard = {
                name : stCardName,
                desc : stCardDesc,
                pos : 'top',
                due : null,
                idList : stList,
            };

            window.Trello.post('/cards/', objNewCard, success);
            return true;
        }
        catch (e)
        {
            return false;
        }
    }

    function doAuthorize()
    {
        debugger;

        var success = function(successMsg)
        {
            console.log('success');
        };

        var error = function(errorMsg)
        {
            console.log(errorMsg);
        };

        try
        {
            window.Trello.authorize({
                type : 'popup',
                name : 'Authorize Trello',
                scope : {
                    read : 'true',
                    write : 'true'
                },
                expiration : 'never',
                success : success,
                error : error
            });
        }
        catch (e)
        {
            alert('An error occurred during the authorization. Error message: ' + JSON.stringify(e));
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
        saveRecord : saveRecord,
        doAuthorize : doAuthorize
    };
});
