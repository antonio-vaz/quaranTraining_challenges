# quaranTraining_challenges
sudo apt-get install nodejs npm vsftpd certbot
sudo npm install -g npm@latest
sudo crontab -e (4,9,14,19,24,29,34,39,44,49,54,59 * * * * sleep 21 ; wget --no-check-certificate -O - https://freedns.afraid.org/dynamic/update.php?REI3UmQycTF0QkNNQjRGQ0JCaHpxMHUxOjE5MDY5NDky >> /tmp/freedns_ctf_info_tm.log 2>&1 &)
sudo certbot certonly (ctf.info.tm)

sudo setcap 'cap_net_bind_service=+ep' /usr/bin/node
