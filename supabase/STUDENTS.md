# Student TOTP Secrets Reference
## Use these secrets to test the QR code scanner

| Name           | Roll Number | TOTP Secret          | Test URL |
|----------------|-------------|----------------------|----------|
| Shivansh       | CS2024001   | JBSWY3DPEHPK3PXP     | [Generate](https://totp.danhersam.com/?secret=JBSWY3DPEHPK3PXP) |
| Aryan          | CS2024002   | GEZDGNBVGY3TQOJQ     | [Generate](https://totp.danhersam.com/?secret=GEZDGNBVGY3TQOJQ) |
| Nisha          | CS2024003   | MFRGGZDFMY4TQNBZ     | [Generate](https://totp.danhersam.com/?secret=MFRGGZDFMY4TQNBZ) |
| Bhawana        | CS2024004   | NBSWY3DPEHPK3PXQ     | [Generate](https://totp.danhersam.com/?secret=NBSWY3DPEHPK3PXQ) |
| Khushi Dhiman  | CS2024005   | OBQXG43XN5ZGI5DZ     | [Generate](https://totp.danhersam.com/?secret=OBQXG43XN5ZGI5DZ) |
| Aarzoo         | CS2024006   | KRSXG5CTMVRXEZLU     | [Generate](https://totp.danhersam.com/?secret=KRSXG5CTMVRXEZLU) |
| Rahul Sharma   | CS2024007   | HXDMVJECJJWSRB3H     | [Generate](https://totp.danhersam.com/?secret=HXDMVJECJJWSRB3H) |
| Priya Singh    | EC2024001   | JZSXE5LZNFWWK3TB     | [Generate](https://totp.danhersam.com/?secret=JZSXE5LZNFWWK3TB) |
| Amit Kumar     | ME2024001   | KNQW24DPNVYCEIDP     | [Generate](https://totp.danhersam.com/?secret=KNQW24DPNVYCEIDP) |
| Sneha Patel    | CS2024008   | LFVWY3DPOVWXI2LB     | [Generate](https://totp.danhersam.com/?secret=LFVWY3DPOVWXI2LB) |
| Vikram Verma   | CE2024001   | MNBVC43XOQZGI4DM     | [Generate](https://totp.danhersam.com/?secret=MNBVC43XOQZGI4DM) |
| Anjali Gupta   | IT2024001   | PFQWG43CPRZGK3DS     | [Generate](https://totp.danhersam.com/?secret=PFQWG43CPRZGK3DS) |
| Rohit Mehta    | CS2024009   | QRSTU2DPEHPK5PXR     | [Generate](https://totp.danhersam.com/?secret=QRSTU2DPEHPK5PXR) |
| Kavya Joshi    | EC2024002   | RSTXG5BONVRHE3LF     | [Generate](https://totp.danhersam.com/?secret=RSTXG5BONVRHE3LF) |
| Deepak Yadav   | ME2024002   | STUVW3DPMNPK4PYS     | [Generate](https://totp.danhersam.com/?secret=STUVW3DPMNPK4PYS) |

## How to use:
1. Run `schema.sql` in Supabase SQL Editor first
2. Then run `seed.sql` to insert all students
3. Each student can use their unique TOTP secret in an authenticator app (Google Authenticator, Authy, etc.)
4. Or use the Test URL links to generate codes online for testing
