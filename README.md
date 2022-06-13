# Elearning DEI - Pretty Login

A graphic enhancement for the login page of the Department of Information Engineering at the University of Padua. [Elearning DEI](https://elearning.dei.unipd.it)

## How-to

1. Add the [Tampermonkey](https://www.tampermonkey.net/) extension to your browser
2. When done, click on the icon that pops up in the top right corner of the window
3. Click on `Dashboard`
4. Then go to `Utilities` and paste this link (<https://upo.milovangudelj.com/inject.js>) in the `Install from URL` field
5. Then click on `Install`, and voilà. The next time you visit the login page you will be greeted with a different, fancier UI.

## Extension

A Chrome browser extension will be available soon. It will eliminate the need for installing Tampermonkey. 

## But...

1. This only works for the email and password method, I have not yet hooked up the 'Login with SPID' button.
2. And I recommend you use Chrome or a Chromium based (e.g. Brave) browser since it's the one I used to test and make the script (I don't have the time and energy to adapt it or integrate Babel and all that stuff)

## TODOs

- [ ] Add expired password screen with links to [student reset](https://uniweb.unipd.it/password/index.php/it/utenti/cambia_password/azione/c?shib_id=) and [employee reset](http://www.ict.unipd.it/servizi/servizi-utenti-istituzionali/posta-elettronica-dipendenti/gestione-password-unipdit)
- [ ] Add password expiring screen with links to reset it
