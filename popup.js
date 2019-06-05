$(document).ready(function(){
	'use strict';
	var vote_up = 0;
	var vote_down = 0;
	var domain = "";
	var domain_id = -1;
	var address = "";
	var address_id = -1;
	var vote = 0;
	var vote_id = -1;


	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

		/// get domain address on current page
        var url = tabs[0].url;
        var pos = url.search(".com");
        if(pos == -1)
            pos = url.search('.edu');
        if(pos == -1)
            pos = url.search('.org');
        var pos1 = url.search("://");
        domain = url.slice(pos1+3, pos+4);

        $('#domain')[0].textContent = domain;

        $.ajax({
        	type: 'post',
        	data: {'domain' : domain},
        	dataType: 'json',
        	url: 'https://boiling-tor-91238.herokuapp.com/vote/php/getDomain.php',
        	success: function(data){
        		domain_id = parseInt(data['id']);
        		vote_up = parseInt(data['vote_up']);
        		vote_down = parseInt(data['vote_down']);
        		setVote();

                //// get current ip address of user
                getLocalIPs(function(ips) {
                    address = ips.join('\n ');
                    $.ajax({
                        type: 'post',
                        data: {'user':address},
                        url: 'https://boiling-tor-91238.herokuapp.com/vote/php/getUser.php',
                        dataType: 'json',
                        success: function(data){
                            address_id = data['id'];
                            $('#ip_address')[0].textContent = address;
                            /// get vote data from vote data table
                    
                            $.ajax({
                                type: 'post',
                                data: {'domain':domain_id, 'user':address_id},
                                url: 'https://boiling-tor-91238.herokuapp.com/vote/php/getVoteData.php',
                                dataType: 'json',
                                success:function(data){
                                    
                                    vote = parseInt(data['vote']);
                                    vote_id = parseInt(data['id']);
                                }
                            });
                        }
                    });
                });
        	}
        });

        
        

	        
        

    });
    $('#up_btn').on('click', function(){

    	switch(vote){
    		case 0:   			// I didn't vote
    			vote_up ++;
    			break;
    		case 1:             // I like it
    			break;
    		case 2:             // I didn't like it
    			vote_up ++;
    			vote_down --;
    			break;
    	}
    	vote = 1;
    	setVote();		//  update vote count on view
    	upgradeVoteDatabase();   // update vote on vote_tbl
		

    });
    $('#down_btn').on('click', function(){
        
    	switch(vote){
    		case 0:   			// I didn't vote
    			vote_down ++;
    			break;
    		case 1:             // I like it
    			vote_up --;
    			vote_down ++;
    			break;
    		case 2:             // I didn't like it
    			break;
    	}
    	vote = 2;
    	setVote();		//  update vote count
    	upgradeVoteDatabase();  // update vote on vote_tbl
		
    });
    function setVote(){
        
    	//var vote_num = vote_up - vote_down;
    	$('#vote_up')[0].textContent = vote_up;
    	$('#vote_down')[0].textContent = vote_down;
        if(vote_up - vote_down >19){
            chrome.tabs.executeScript(null, {
            code:"document.body.style.backgroundColor='LightCoral';"
            }, _=>{
              let e = chrome.runtime.lastError;
              if(e !== undefined){
                console.log('asdf');
              }
            });
        }
    	/// set domain   
    	$.ajax({
    		type:'post',
    		data: {"domain_id":domain_id, 'vote_up':vote_up, 'vote_down': vote_down},
    		url: "https://boiling-tor-91238.herokuapp.com/vote/php/setDomain.php",
    		success:function(data){
                $('#domain')[0].textContent = domain;
    		}
    	});

    }
    function upgradeVoteDatabase(){
    	$.ajax({
    		type:'post',
    		data:{'vote_id':vote_id, 'vote':vote},
    		url: "https://boiling-tor-91238.herokuapp.com/vote/php/setVoteData.php",
    		success:function(data){
    		}
    	});
    }
    function getLocalIPs(callback) {
        var ips = [];

        var RTCPeerConnection = window.RTCPeerConnection ||
            window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

        var pc = new RTCPeerConnection({
            // Don't specify any stun/turn servers, otherwise you will
            // also find your public IP addresses.
            iceServers: []
        });
        // Add a media line, this is needed to activate candidate gathering.
        pc.createDataChannel('');
        
        // onicecandidate is triggered whenever a candidate has been found.
        pc.onicecandidate = function(e) {
            if (!e.candidate) { // Candidate gathering completed.
                pc.close();
                callback(ips);
                return;
            }
            var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
            if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
                ips.push(ip);
        };
        pc.createOffer(function(sdp) {
            pc.setLocalDescription(sdp);
        }, function onerror() {});
    }
    function getIP(){

    }
});