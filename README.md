workflow
  1.giving a instruction to echo dot
  2.echo dot issue RESTful GET call
  3.nodejs in raspberry recieves the call
  4.nodejs tell the Infrared emitter to signal
  
 
 
# Stop lirc to free up /dev/lirc0
sudo /etc/init.d/lirc stop

# Create a new remote control configuration file (using /dev/lirc0) and save the output to ~/lircd.conf
irrecord -d /dev/lirc0 ~/lircd.conf

# Make a backup of the original lircd.conf file
sudo mv /etc/lirc/lircd.conf /etc/lirc/lircd_original.conf

# Copy over your new configuration file
sudo cp ~/lircd.conf /etc/lirc/lircd.conf

# Start up lirc again
sudo /etc/init.d/lirc start


# List all of the commands that LIRC knows 
irsend LIST "" ""

# List all of the commands that LIRC knows for SHARP
irsend LIST SHARP ""

# Send the KEY_POWER command once
irsend SEND_ONCE SHARP KEY_POWER

# Send the KEY_VOLUMEDOWN command once
irsend SEND_ONCE SHARP KEY_VOLUMEDOWN
