$(function(){
	//  Run a test for if generatedContent is already supported
	//  Test 
	$('body').append("<span id='GCtestObj'><span id='GCtestChild'></span></span>");
	ar("#GCtestChild:before", "content: ''; width: 1px; display:block;");		
	if ($('#GCtestObj').width() === 0) {
		//  Generated Content isnt available
		var sheets = document.styleSheets, addedRules = [], test = ['before','after'];
		//  Loop throught all stylesheets
		for(i=0;i<sheets.length;i++){
			//  work out which method to get the CSS rules
			var s = sheets[i], rules = s.cssRules ? s.cssRules : s.rules;
			//  Loop through all rules
			for (p=0;p<rules.length;p++){
				//  Loop through all tests
				for(var l in test){
					//  if this rule uses one of the test selectors then generate the content
					if (rules[p].selectorText.indexOf(":"+test[l]) > -1){ genCont(rules[p], test[l]); }
				}
			}
		}
		//  Add a new CSS rule to the first stylesheet
		function ar(selector, css){
			if (document.styleSheets[0].addRule){ document.styleSheets[0].addRule(selector, css); }else{document.styleSheets[0].insertRule(selector+'{'+css+'}');}	
		}
		//  Generate the new generated element and apply a specific rule.
		function genCont(rule, type){
			var elems = $(rule.selectorText.replace(":"+type, "")), r = type+addedRules.length;
			addedRules.push(r);
			if (r==='after'){elems.append("<span class='"+r+"'>"+rule.style.content+"</span>");} else {elems.prepend("<span class='"+r+"'></span>");}
			ar("."+r, rule.style.cssText);
		}
	}
	$('#GCtestObbj').remove();
});

