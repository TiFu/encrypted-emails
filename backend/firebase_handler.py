from firebase import firebase
import gpg_handler
import json


class dbQuerier():

    def __init__(self):
        self.firebase = firebase.FirebaseApplication("https://cryptomail-fcc0f.firebaseio.com/", None)

    def get_public_key(self, email):
        if self.userExists(email):
            red_email = email.replace("@", "").replace(".", "").replace("-", "")
            result=self.firebase.get("/pubkeys", red_email)
            return result["pubkey"] 
        return None

    def get_private_key(self, email):
        if self.userExists(email):
            red_email = email.replace("@", "").replace(".", "").replace("-", "")
            result=self.firebase.get("/privkeys", red_email)
            return result
        return None

    def userExists(self, email):
        red_email = email.replace("@", "").replace(".", "").replace("-", "")
        print(red_email)
        result = self.firebase.get("/pubkeys", red_email)
        if not result:
            return False
        return True

    def createUser(self, email, passphrase):
        
        pub_key, priv_key = gpg_handler.createKeys(email, passphrase)
        red_email = email.replace("@", "").replace(".", "").replace("-", "")
        self.firebase.put("/pubkeys", red_email, {"pubkey":pub_key})
        self.firebase.put("/privkeys", red_email, priv_key)