import os
import gnupg
from os.path import expanduser
gpgdir = expanduser("~/.cryptomail")



def createKeys(mail, passphrase):
    '''returns public key '''
    os.system('rm -rf ' + gpgdir )
    gpg = gnupg.GPG(gnupghome=gpgdir)
    input_data = gpg.gen_key_input(
        name_email=mail,
        passphrase=passphrase,
        key_length=2048)
    key = gpg.gen_key(input_data)
    print(str(key))

    ascii_armored_public_keys = gpg.export_keys(str(key))
    ascii_armored_private_keys = gpg.export_keys(str(key), True, passphrase=passphrase)
    
    return ascii_armored_public_keys, ascii_armored_private_keys

def encryptString(string, recipientkey):
    gpg = gnupg.GPG(gnupghome=gpgdir)
    #importing the string from a key
    imported = gpg.import_keys(recipientkey)
    #set its trust level
    gpg.trust_keys(imported.fingerprints, "TRUST_ULTIMATE")
    #print(imported.fingerprints)
    enc_string = gpg.encrypt(string, imported.fingerprints)
    #print(enc_string)
    return enc_string

def decryptString(message, passphrase):
    gpg = gnupg.GPG(gnupghome=gpgdir)
    return gpg.decrypt(message, passphrase=passphrase)


# if __name__ == "__main__":
#     pubkey, privkey = createKeys("cunt@cunt.com", "cunt")
#     print(pubkey)
#     print(privkey)
#     encmessage = encryptString("hello you cunt", "cunt2@cunt.com", pubkey2)
#     print(str(encmessage))
#     print(decryptString(str(encmessage), "cunt2"))