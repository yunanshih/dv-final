import pandas as pd

county_list = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市',
'苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣',
'基隆市', '新竹市', '嘉義市']

# for index, county in enumerate(county_list):
df = pd.read_csv('./output/'+county_list[14]+'.csv')
print(df.value_counts().head(30))
df.value_counts().head(30).to_csv('./test/'+county_list[14]+'.csv',index=True)