const { compose, join, map, sort, split } = require('ramda');

const fields = 'Base_Price__c,CreatedById,CreatedDate,CurrencyIsoCode,Description,Discount,Id,IsDeleted,LastModifiedDate,ListPrice,Min_Price__c,Name,OpportunityId,PricebookEntryId,Product2Id,ProductCode,Quantity,ServiceDate,SortOrder,Subtotal,SystemModstamp,TotalPrice,UnitPrice,Discount_Rate__c,Variable_Rate__c,Hardware_Brand__c';

const format = compose(
  join(',\n'),
  map(x => `'${x}'`),
  sort((a, b) => a<b?-1:1),
  split(',')
);

console.log(format(fields));
