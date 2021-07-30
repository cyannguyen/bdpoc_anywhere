/*
 * Licensed Materials - Property of IBM
 *
 * 5725-M39
 *
 * (C) Copyright IBM Corp. 2020 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

var termsnprivacy = {
		privacyTitle : "Privacy Policy",
		
		getPrivacyPolicy: function (){
			var lines = [];
			
			lines.push("This IBM Mobile Application Privacy Statement (\"Mobile Privacy Statement\") explains the data IBM may collect on behalf of the entity that entitles you to use this IBM mobile application (or \"App\") used in connection with an IBM product offering. This Mobile Privacy Statement only applies to the information IBM may collect on behalf of that entity. It does not apply to the information that entity may collect for its own use.");
			lines.push("\n");
			lines.push("Downloading, accessing, or otherwise using the App indicates that you have read this Mobile Privacy Statement and consent to its terms. If you do not consent to the terms of this Mobile Privacy Statement, do not proceed to download, access, or otherwise use the App.");
			lines.push("\n");
			lines.push("IBM may collect the following information through the App:");
			lines.push("\u2022 Personal information you may provide to download and use the App, including your email address, name, and password");
			lines.push("\u2022 Information about your usage of the App, including crash logs and usage statistics");
			lines.push("\u2022 Information about your device and its interaction with the App, including the type of mobile device you use with the App, its unique user ID, IP address, and operating system, and the type of mobile Internet browsers in use");
			lines.push("\u2022 Information about the location of your device, including geo-location information");
			lines.push("\n");
			lines.push("IBM may use the information collected through this App in the following ways:");
			lines.push("\u2022 To review the quality and improve the functionality of the App");
			lines.push("\u2022 To better improve the way the App works with your device");
			lines.push("\u2022 To create new Apps");
			lines.push("\u2022 To provide anonymized user analytics and industry benchmarking");
			lines.push("\u2022 To share anonymized data with third parties");
			lines.push("\n");
			lines.push("Provided that this information is not required to be retained pursuant to judicial proceeding, court order, or legal process, this information will be deleted when it is no longer needed to provide the services associated with the App, unless it has been anonymized and does not longer contained personally identifiable information.");
			lines.push("\n");
			lines.push("IBM may use cookies and/or other web tracking technology through this App. While Apps at this time do not recognize automated browser signals regarding tracking mechanisms, such as \'do not track\" instructions, you can generally express your privacy preferences regarding the use of most cookies and similar technologies though your web browser. You consent to their use by using this App.");
			lines.push("\n");
			lines.push("IBM does not use the App to knowingly solicit data from or market to children under the age of 13. If a parent or guardian becomes aware that their child has provided us with information without their consent, they should contact us via http://www.ibm.com/scripts/contact/contact/us/en/privacy/. We will delete such information from our files within a reasonable time.");
			lines.push("\n");
			lines.push("You may opt-out of all collection of information by IBM by uninstalling this App from your mobile device.");
			lines.push("\n");
			lines.push("This Mobile Privacy Statement may be updated from time to time. We will notify you of any changes to this Mobile Privacy Statement by posting a new version at http://www.ibm.com/privacy/us/en/. We will post a notice at the top of the page notifying users when it is updated or modified in a material way. If we are going to use your personal information in a manner different from what is stated at the time of collection, we will notify you, and you will have a choice as to whether or not we can use your personal information in such a way. By downloading, accessing or otherwise using this App after any changes to this Mobile Privacy Statement, you indicate that you have read the updated Mobile Privacy Statement and consent to its terms.");
			lines.push("\n");
			lines.push("As a global organization, we process information we collect, including personal information, in various countries around the world. You give us consent to process such information worldwide, both directly and through third party service providers working on our behalf.");
			
			msg = "";
			lines.forEach(function(line){
				msg += line+"\n"
			});
			
			return msg;
		},
	
	EULATitle : "Terms and Conditions",
	
	getEULATerms : function() {

		var lines = [];
		
		//lines.push("TERMS AND CONDITIONS");
		//lines.push("\n");
		lines.push("This License is solely between you and IBM. IBM is solely responsible for the App and its content. ");
		lines.push("\n");
		lines.push("APPS RECEIVED FROM IBM UNDER THESE TERMS AND CONDITIONS ARE LICENSED, NOT SOLD. BY INSTALLING AND USING THIS APP, YOU AGREE TO THESE TERMS. IF YOU ARE ACCEPTING THESE TERMS ON BEHALF OF ANOTHER LICENSEE, YOU REPRESENT AND WARRANT THAT YOU HAVE FULL AUTHORITY TO BIND THAT LICENSEE TO THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THE APP AND REMOVE IT FROM YOUR DEVICE;");
		lines.push("\n");
		lines.push("This APP may only be used with IBM Maximo Anywhere or its successor programs and services.");
		lines.push("\n");
		lines.push("1. Definitions");
		lines.push("\"Authorized Use\" - use on one mobile device running an applicable operating system. \"IBM\" - International Business Machines Corporation or one of its subsidiaries. \"App\" -the accompanying software, including the original and all whole or partial copies: 1) machine-readable instructions and data, 2) components, files, and modules, 3) audio-visual content (such as images, text, recordings, or pictures), and 4) related licensed materials (such as keys and documentation).");
		lines.push("\n");
		lines.push("2. License Grant");
		lines.push("The App is owned by IBM or an IBM supplier and is copyrighted and licensed, not sold. IBM grants you a nonexclusive license to use the App on one device as specified and make a backup copy, all provided that:");
		lines.push("a. You have lawfully obtained the App and comply with these Terms and Conditions;");
		lines.push("b. You ensure that anyone who uses the App does so only on your behalf and complies with the terms of these Terms and Conditions;");
		lines.push("c. You do not 1) use, copy, modify, or distribute the App except as expressly permitted by these Terms and Conditions; 2) reverse assemble, reverse compile, otherwise translate, or reverse engineer the App, except as expressly permitted by law without the possibility of contractual waiver; 3) use any of the App's components, files, modules, audio-visual content, or related licensed materials separately from that App; or 4) redistribute, sublicense, rent, or lease the App; and");
		lines.push("d. If you obtain this App as a Supporting App, you use this App only to support the Principal Program and subject to any limitations in the license to the Principal Program. For purposes of this Item \"d,\" a \"Supporting App\" is an App that is part of, or functions in conjunction with, another IBM Program (\"Principal Program\") and is identified as such in related documentation; and you comply with any Usage Rules set forth in Terms of Service of the Principal Program.");
		lines.push("\n");
		lines.push("The App is non-transferrable except to accounts associated with the purchaser under a volume purchasing or Family Sharing plan.");
		lines.push("\n");
		lines.push("3. External Services");
		lines.push("The App may enable access to IBM\'s and/or third-party services and websites (collectively and individually, \"External Services\"). You agree to use the External Services at your sole risk. IBM is not responsible for examining or evaluating the content or accuracy of any third-party External Services and shall not be liable for any such third-party External Services. Data displayed by any App or External Service, including but not limited to financial, medical and location information, is for general information purposes only and is not guaranteed by IBM or its agents. You will not use the External Services in any manner that is inconsistent with the terms of these Terms and Conditions or that infringes the intellectual property rights of IBM or any third party. You agree not to use the External Services to harass, abuse, stalk, threaten or defame any person or entity, and that IBM is not responsible for any such use. To the extent that you choose to use External Services, you are solely responsible for compliance with any applicable laws. IBM reserves the right to change, suspend, remove, disable or impose access restrictions or limits on any External Services at any time without notice or liability to you.");
		lines.push("\n");
		lines.push("4. Consent to Use of Data: You agree that IBM may collect and use technical data and related information — including but not limited to technical information about your device, system and application software, and peripherals — that is gathered periodically to facilitate the provision of software updates, product support, and other services to you (if any) related to the App. IBM may use this information, as long as it is in a form that does not personally identify you, to improve its products or to provide services or technologies to you.");
		lines.push("\n");
		lines.push("5. Updates, Fixes, Patches and Other Maintenance Unless specified elsewhere in writing, maintenance will be provided by and at the discretion solely of IBM. The distributor has no obligation for maintenance and/or support. ");
		lines.push("\n");
		lines.push("When you receive an update, fix, or patch to an App, you accept any additional or different terms that are applicable to such update, fix, or patch that are specified in its associated Terms and Conditions. If no additional or different terms are provided, then the update, fix, or patch is subject solely to these Terms and Conditions. If the App is replaced by an update, you agree to promptly discontinue use of the replaced App.");
		lines.push("\n");
		lines.push("6. Term and Termination – These Terms and Conditions are effective until terminated. IBM may terminate your license if you fail to comply with the terms of these Terms and Conditions. If the license is terminated for any reason by either party, you agree to promptly discontinue use of and destroy all your copies of the App.");
		lines.push("\n");
		lines.push("7. Money-back Guarantee");
		lines.push("If you are dissatisfied with the App for any reason, you may terminate the license and obtain a refund of the amount you paid, if any, for the App, provided that you certify destruction of the App to IBM within 30 days of the download.");
		lines.push("\n");
		lines.push("8. No Warranties");
		lines.push("SUBJECT TO ANY STATUTORY WARRANTIES THAT CANNOT BE EXCLUDED, IBM MAKES NO WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED, REGARDING THE APP OR SUPPORT, IF ANY, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE, AND TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. THE DISCLAIMERS AND EXCLUSIONS IN THIS SECTION 8 ALSO APPLY TO ANY OF IBM\'S APP DEVELOPERS. IBM DOES NOT PROVIDE SUPPORT OF ANY KIND, UNLESS IBM SPECIFIES OTHERWISE. IN SUCH EVENT, ANY SUPPORT PROVIDED BY IBM IS SUBJECT TO THE DISCLAIMERS AND EXCLUSIONS IN THIS SECTION 8.");
		lines.push("\n");
		lines.push("In the event you believe the App does not conform to a statutory warrant, your sole recourse is to notify IBM, which will refund the purchase price of the app.  Any other damages, liabilities, costs or expenses attributable to warranty non-conformance is your responsibility.");
		lines.push("\n");
		lines.push("9. Limitation of Liability");
		lines.push("The limitations and exclusions in this Section 9 (Limitation of Liability) apply to the full extent they are not prohibited by applicable law without the possibility of contractual waiver.");
		lines.push("\n");
		lines.push("9.1 Items for Which IBM May Be Liable");
		lines.push("Circumstances may arise where, because of a default on IBM's part or other liability, you are entitled to recover damages from IBM. Regardless of the basis on which you are entitled to claim damages from IBM (including fundamental breach, negligence, misrepresentation, or other contract or tort claim), except where prohibited by applicable law, IBM\'s entire liability for all claims in the aggregate arising from or related to each App or otherwise arising under these Terms and Conditions will not exceed the charges (if the App is subject to fixed term charges, up to twelve months\' charges) you paid for the App that is the subject of the claim. If there is no charge for the App, the maximum liability is $50 US. This limit also applies to any of IBM\'s App developers, distributors and suppliers. It is the maximum for which IBM, its App developers, distributors and suppliers are collectively responsible.");
		lines.push("\n");
		lines.push("9.2 Items for Which IBM Is Not Liable");
		lines.push("TO THE EXTENT NOT PROHIBITED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES IS IBM, ITS APP DEVELOPERS, DISTRIBUTORS OR SUPPLIERS LIABLE FOR ANY OF THE FOLLOWING, EVEN IF INFORMED OF THEIR POSSIBILITY:");
		lines.push("a. LOSS OF, OR DAMAGE TO, DATA;");
		lines.push("b. PERSONAL INJURY;");
		lines.push("c. SPECIAL, INCIDENTAL, EXEMPLARY, OR INDIRECT DAMAGES, OR FOR AN ECONOMIC CONSEQUENTIAL DAMAGES; OR");
		lines.push("d. LOST PROFITS, BUSINESS, REVENUE, GOODWILL, OR ANTICIPATED SAVINGS.");
		lines.push("\n");
		lines.push("You acknowledge that IBM, its App developers, distributors and/or its suppliers are not responsible for any other claims of any nature except as explicitly stated in Section 8. ");
		lines.push("\n");
		lines.push("10. Third Party Notices");
		lines.push("The App may include third party code that IBM, not the third party, licenses to you under these Terms and Conditions. Notices, if any, for the third party code (\"Third Party Notices\") are included for your information only. These notices can be found in the App\'s NOTICES file(s)");
		lines.push("\n");
		lines.push("11. General");
		lines.push("a. Nothing in these Terms and Conditions affects any statutory rights that cannot be waived or limited by contract;");
		lines.push("b. If any provision of these Terms and Conditions is held to be invalid or unenforceable, the remaining provisions remain in full force and effect;");
		lines.push("c. You agree to comply with all applicable export and import laws and regulations, including U.S. embargo and sanctions regulations and prohibitions on export for certain end uses or to certain users. You warrant that you are not located in a country subject to a U.S. Government embargo, designated as a “terrorist supporting country, or on an US Government list of prohibited for restricted parties;");
		lines.push("d. You authorize IBM (and its successors and assigns, contractors and IBM Business Partners) to store and use your business contact information wherever they do business, in connection with IBM products and services, or in furtherance of IBM\'s business relationship with you;");
		lines.push("e. Unless otherwise required by applicable law without the possibility of contractual waiver or limitation: 1) neither party will bring a legal action, regardless of form, for any claim arising out of or related to these Terms and Conditions more than two years after the cause of action ar ose; and 2) upon the expiration of such time limit, any such claim and all respective rights related to the claim lapse;");
		lines.push("f. Neither you nor IBM is responsible for failure to fulfill any obligations due to causes beyond its control;");
		lines.push("g. You and IBM acknowledge that the distributor of this App is a third party beneficiary of these Terms and Conditions with all rights of such status under law. Except for the preceding statement, no right or cause of action for any third party is created by these Terms and Conditions, nor is IBM responsible for any third party claims against you;");
		lines.push("h. The license and intellectual property indemnification terms of your other agreements with IBM (such as the IBM Customer Agreement) do not apply to App licenses granted under these Terms and Conditions. Nothing in these Terms and Conditions affects the terms and conditions of any agreement between you and any third party;");
		lines.push("i. You may not use or otherwise export or re-export the App except as authorized by United States law and the laws of the jurisdiction in which the App was obtained. In particular, but without limitation, the App may not be exported or re-exported (a) into any U.S.-embargoed countries or (b) to anyone on the U.S. Treasury Department\'s Specially Designated Nationals List or the U.S. Department of Commerce Denied Persons List or Entity List. By using the App, you represent and warrant that you are not located in any such country or on any such list. You also agree that you will not use these products for any purposes prohibited by United States law, including, without limitation, the development, design, manufacture, or production of nuclear, missile, or chemical or biological weapons; and");
		lines.push("j. The App and related documentation are \"Commercial Items\", as that term is defined at 48 C.F.R. §2.101, consisting of \"Commercial Computer Software\" and \"Commercial Computer Software Documentation\", as such terms are used in 48 C.F.R. §12.212 or 48 C.F.R. §227.7202, as applicable. Consistent with 48 C.F.R. §12.212 or 48 C.F.R.§227.7202-1 through 227.7202-4, as applicable, the Commercial Computer Software and Commercial Computer Software Documentation are being licensed to U.S. Government end users (a) only as Commercial Items and (b) with only those rights as are granted to all other end users pursuant to the terms and conditions herein. Unpublished-rights are reserved under the copyright laws of the United States.");
		lines.push("\n");
		lines.push("12. Geographic Scope and Governing Law");
		lines.push("Both parties agree to the application of the laws of the country in which you obtained the App to govern, interpret, and enforce all of your and IBM\'s respective rights, duties, and obligations arising from, or relating in any manner to, the subject matter of these Terms and Conditions, without regard to conflict of law principles.");
		lines.push("\n");
		lines.push("The United Nations Convention on Contracts for the International Sale of Goods does not apply.");
		lines.push("\n");
		lines.push("All rights, duties, and obligations are subject to the courts of the country in which you obtained the App license.");
		
		
		var strEULAText = "";
		lines.forEach(function(line){
			strEULAText += line+"\n"
		});
		
		return strEULAText;
	}

}
