## get the coding instructions from https://www.notion.so/Concurrency-Control-a54f1553049c47909423db300d4c1bba?pvs=4#be508cd182794b7aa53ce6aae658520e

# HOW TO TEST THIS

## add a debugger point in the index.mjs at const result = await conn.query(sql, [id]);

## Now fire 2 queries on seperate postman tabs on the same controller.

## after that run the debugger and see the effects.

# Conclusion

## The request that was send before was processed and meanwhile it is processing the 2nd request was waiting at the DP call, basically DB was making it wait. After 1st transaction is completed then the second transaction works and after that 2nd transaction sees seat is booked.
