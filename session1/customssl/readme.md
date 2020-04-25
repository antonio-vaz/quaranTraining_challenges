sudo openssl genrsa -out cert.key 2048
sudo openssl req -new -key cert.key -out cert.csr
sudo certbot certonly --csr cert.csr
	Saving debug log to /var/log/letsencrypt/letsencrypt.log

	How would you like to authenticate with the ACME CA?
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	1: Spin up a temporary webserver (standalone)
	2: Place files in webroot directory (webroot)
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 1
	Plugins selected: Authenticator standalone, Installer None
	Performing the following challenges:
	http-01 challenge for ctf.info.tm
	Waiting for verification...
	Cleaning up challenges
	Server issued certificate; certificate written to /home/unshityourself/quaranTraining_challenges/session1/customssl/0000_cert.pem
	Cert chain written to 10
	Cert chain written to 11

	IMPORTANT NOTES:
	 - Congratulations! Your certificate and chain have been saved at:
	   /home/unshityourself/quaranTraining_challenges/session1/customssl/0001_chain.pem
	   Your cert will expire on 2020-07-24. To obtain a new or tweaked
	   version of this certificate in the future, simply run certbot
	   again. To non-interactively renew *all* of your certificates, run
	   "certbot renew"
	 - If you like Certbot, please consider supporting our work by:

	   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
	   Donating to EFF:                    https://eff.org/donate-le

