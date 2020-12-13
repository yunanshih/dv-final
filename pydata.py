import csv

county_list = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市',
'苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣',
'基隆市', '新竹市', '嘉義市']

data = []
for county in county_list:
  data.append([])

with open('./data/108A2.csv', newline='', encoding="utf-8-sig") as csvfilein:
  rows = csv.reader(csvfilein)

  for row in rows:
    if len(row) < 2:
      continue
    row[1] = row[1].split('/')[0]
    row[1] = row[1].split('(')[0]
    row[1] = row[1].split('與')[0]
    row[1] = row[1].split('、')[0]
    parsed = row[1].split(' ')[0]

    if '路' in parsed and '段' in parsed:
      parsed = parsed.split('段')[0] + '段'
    elif '路' in parsed and not '段' in parsed:
      parsed = parsed.split('路')[0] + '路'
    elif '線' in parsed and not '電線' in parsed:
      parsed = parsed.split('線')[0] + '線'
    elif '線' in parsed and '路' in parsed:
      parsed = parsed.split('線')[0] + '線'
    elif '巷' in parsed:
      parsed = parsed.split('巷')[0] + '巷'
    elif '國道' in parsed and '號' in parsed:
      parsed = parsed.split('號')[0] + '號'
    elif '道' in parsed and '號' in parsed:
      parsed = parsed.split('道')[0] + '道'
    elif '大道' in parsed:
      parsed = parsed.split('大道')[0] + '大道'
    elif '街' in parsed:
      parsed = parsed.split('街')[0] + '街'
    elif '里' in parsed:
      parsed = parsed.split('里')[0] + '里'
    elif '村' in parsed:
      parsed = parsed.split('村')[0] + '村'
    elif '號' in parsed:
      parsed = parsed.split('號')[0] + '號'

    for index, county in enumerate(county_list):
      if county in parsed:
        data[index].append(parsed)

for index, county in enumerate(county_list):
#   with open('./output/' + county + '_A2.csv', 'w', newline='', encoding="utf-8-sig") as csvfileout:
#     writer = csv.writer(csvfileout)
#     writer.writerow(['發生地點'])
#     for d in data[index]:
#       writer.writerow([d])

  with open('./output/' + county + '_A2.csv', 'a', newline='', encoding="utf-8-sig") as csvfileout:
    writer = csv.writer(csvfileout)
    for d in data[index]:
      writer.writerow([d])