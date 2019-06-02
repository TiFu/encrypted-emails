# Crypto-Mail
A simple solution for automatically encrypting your email to known recipients.

This project was created within 24 hours at [Hackaburg 2019](https://hackaburg.de/) 
and submitted on [devpost](https://devpost.com/software/encrypted-e-mails).

## Demo

[https://www.youtube.com/watch?v=1mWBbwdxuQg](https://www.youtube.com/watch?v=1mWBbwdxuQg)


## Inspiration

In a world where we are more and more concerned about who has access to our data, encrypting emails in order to hide them from the lustful eyes of your ISP and other, perhaps more nefarious actors, therefore seems like a logical choice. Encrypting emails is not a new technology. However, setting it up has always been very difficult and not friendly to new users. Our project aims to remedy that.

## What it does

When you first log in it creates a public/private key pair, and publishes your public key to a database. If someone now sends you an email using our client it will be automatically encrypted, and if you receive an email encrypted with your own public key it will be automatically decrypted.

## How we built it

We started writing down all of the problems we felt we had to solve and then went about solving them.

## Challenges we ran into

There was no ready-made framework for sending and editing emails, we therefore had to write our own front end and back end to achieve a sufficient amount of control over the email protocol. Furthermore, storing our public keys safely in a database was quite challenging, fortunately the firebase framework from google was fairly simply to get going.

## Accomplishments that we're proud of

Just being able to see our system work as intended, automatically encrypting and decrypting emails

## What we learned

We learned a lot about how emails are constructed and sent over the Internet, specifically the smtp and imaps protocols as well as the RFC822 standard for emails. We also learned quite a bit about pgp and key generation.

## What's next for Encrypted E-Mails

Getting away from our own Hackathon UI and turning the project into a plugin for email clients such as Thunderbird or Outlook. This would even further increase ease of adoptability for existing users of such programs

