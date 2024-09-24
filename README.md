# Website Guard

A Chrome extension that shields you from bad websites. Designed to be user-friendly - easy peace-of-mind for non-tech-savvy people.

WIP - contact me if you are interested in using this.

## How does it work?

Every time you request a new URL it is sent to the WHOIS API. WHOIS returns the registration info for the site.

If the site is considered unreliable based on its info, Website Guard will stop you from reaching it.

Common scam website behaviors that Website Guard checks are:

- Created within 90 days ago
- Registered for a year or less