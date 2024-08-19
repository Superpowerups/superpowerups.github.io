/* Tally Subscription Saver */
$(document).ready(function() {
    if(_kapow_ss && _kapow_ss.tallyId){
        let tally_onOpen = () => {
                    // The popup was opened, mark the form as seen
                    // ...
                    console.log("opened");
                };
        let tally_onClose = () => {
                    // The popup was closed
                    // ...
                    console.log("closed");
                };
        let tally_onPageview = (page) => {
                    // Log the page view
                    // ...
                    console.log("pag viewed",page);
                };
        let tally_onSubmit = (payload) => {
                    // Form was submitted, use the answers payload in your application
                    // ...
                    console.log("payload",payload);
                    console.log("Looking for answer: "+_kapow_ss.cancelField);

                    let cancelAnswer;
                    let redirectAnswer;
                    let cancel = false;
                    for (let i = 0; i < payload.fields.length; i++) {
                        console.log(payload.fields[i]);
                        if (payload.fields[i].title ===  _kapow_ss.cancelField) {
                            cancelAnswer = payload.fields[i].answer;

                        }
                        if (payload.fields[i].title ===  _kapow_ss.redirectField) {
                            redirectAnswer = payload.fields[i].answer;

                        }
                    }

                    console.log("cancelAnswer",cancelAnswer);
                    console.log("redirectAnswer",redirectAnswer);
                    if (cancelAnswer) {
                    console.log("Found answer:", cancelAnswer);
                        if(cancelAnswer.value && cancelAnswer.value=="Yes"){
                            // Unhide the original button
                            $(cancelButton).show();
                        
                            // Hide the new button
                            $('.kapow-cancel-sub').hide();
                        
                            //check for redirect
                            if(redirectAnswer && redirectAnswer!=""){
                                console.log("Opening tab"+redirectAnswer.value);
                                window.open(redirectAnswer.value, '_blank');
                            }

                            console.log("submitting cancel");
                            // Wait for 3 seconds before executing the function
                            setTimeout(function() {
                                $(".edit_stripe_support_subscription").submit();
                            }, 3000);
                            
                        } else {
                            console.log("Subscription Saved!");
                            if(redirectAnswer && redirectAnswer!=""){
                                console.log("Opening tab"+redirectAnswer.value);
                                window.open(redirectAnswer.value, '_blank');
                            }
                        }

                    } else {
                        console.log("No answer found for title:", _kapow_ss.cancelField);
                    }


                };
        let tally_options = {
                layout: 'modal',
                overlay: true,
                width: _kapow_ss.width,
                hiddenFields: {
                    email: Thinkific.current_user.email,
                    first_name: Thinkific.current_user.first_name
                }, 
                onOpen: tally_onOpen,
                onClose: tally_onClose,
                onPageView: tally_onPageview,
                onSubmit: tally_onSubmit
            }

        if(_kapow_ss.emoji && _kapow_ss.emoji!=""){
            let emoji_obj = {
                text: _kapow_ss.emoji
            }
            if(_kapow_ss.emojiAnimation && _kapow_ss.emojiAnimation!=""){
                emoji_obj.animation = _kapow_ss.emojiAnimation;
            }
            tally_options.emoji = emoji_obj;
        }
        var cancelButton = '.edit_stripe_support_subscription .button';
        // Create a new button element (sibling)
        var newButton = $('<button type="button " class="button button-primary kapow-cancel-sub">'+$(cancelButton).val()+'</button>'); // Assign a custom class

        // Insert the new button after the specific element with the href
        $(cancelButton).after(newButton);

        // Hide the original button
        $(cancelButton).hide();
        $(".kapow-cancel-sub").show();
        
        $(".kapow-cancel-sub").click(function(event){
            event.preventDefault();
            
            Tally.openPopup(_kapow_ss.tallyId, tally_options);      
            
        })
    }
});    