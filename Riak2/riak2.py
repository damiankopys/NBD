# NBD-Riak2
import json
import requests

doc1 = "{'Name': 'Mercedes GL', 'Horsepower': 550, 'Acceleration': 4.9, 'Year': '2012-01-01'}"
url1 = 'http://localhost:8098/buckets/s25547/keys/MercedesGL'
headers = {'Content-Type': 'application/json'}

r1 = requests.put(url1, data=json.dumps(doc1), headers=headers)
print('\n', 'Wstawienie dokumentu do bazy: ', r1, '\n')

r2 = requests.get(url1)
print('\n', 'Pobranie dokumentu z bazy: ', r2)
print(r2.text, '\n')

doc2 = "{'Name': 'Mercedes GL Brabus', 'Horsepower': 700, 'Acceleration': 4.2, 'Year': '2012-01-01'}"
r3 = requests.put(url1, data=json.dumps(doc2), headers=headers)
print('\n', 'Update dokumentu w bazie: ', r3, '\n')

r4= requests.get(url1)
print('\n', 'Pobranie zmodyfikowanego dokumentu z bazy: ', r4)
print(r4.text, '\n')

r5 = requests.delete(url1)
print('\n', 'Usunięcie dokumentu z bazy: ', r5, '\n')

r6 = requests.get(url1)
print('\n', 'Próba pobrania dokumentu z bazy: ', r6)
print(r6.text, '\n')