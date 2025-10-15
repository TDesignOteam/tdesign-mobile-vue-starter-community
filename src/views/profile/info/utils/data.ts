interface AreaList {
  label: string
  value: string
  children?: AreaList[]
}

const areaList: AreaList[] = [
  {
    label: '北京市',
    value: '110000',
    children: [
      { value: '110101', label: '东城区' },
      { value: '110102', label: '西城区' },
      { value: '110105', label: '朝阳区' },
      { value: '110106', label: '丰台区' },
      { value: '110107', label: '石景山区' },
      { value: '110108', label: '海淀区' },
      { value: '110109', label: '门头沟区' },
      { value: '110111', label: '房山区' },
      { value: '110112', label: '通州区' },
      { value: '110113', label: '顺义区' },
      { value: '110114', label: '昌平区' },
      { value: '110115', label: '大兴区' },
      { value: '110116', label: '怀柔区' },
      { value: '110117', label: '平谷区' },
      { value: '110118', label: '密云区' },
      { value: '110119', label: '延庆区' },
    ],
  },
  {
    label: '江苏省',
    value: '320000',
    children: [
      {
        value: '320100',
        label: '南京市',
      },
      {
        value: '320200',
        label: '无锡市',
      },
      {
        value: '320300',
        label: '徐州市',
      },
      {
        value: '320400',
        label: '常州市',
      },
      {
        value: '320500',
        label: '苏州市',
      },
      {
        value: '320600',
        label: '南通市',
      },
      {
        value: '320700',
        label: '连云港市',
      },
      {
        value: '320800',
        label: '淮安市',
      },
      {
        value: '320900',
        label: '盐城市',
      },
      {
        value: '321000',
        label: '扬州市',
      },
      {
        value: '321100',
        label: '镇江市',
      },
      {
        value: '321200',
        label: '泰州市',
      },
      {
        value: '321300',
        label: '宿迁市',
      },
    ],
  },
  {
    label: '福建省',
    value: '350000',
    children: [
      {
        value: '350100',
        label: '福州市',
      },
      {
        value: '350200',
        label: '厦门市',
      },
      {
        value: '350300',
        label: '莆田市',
      },
      {
        value: '350400',
        label: '三明市',
      },
      {
        value: '350500',
        label: '泉州市',
      },
      {
        value: '350600',
        label: '漳州市',
      },
      {
        value: '350700',
        label: '南平市',
      },
      {
        value: '350800',
        label: '龙岩市',
      },
      {
        value: '350900',
        label: '宁德市',
      },
    ],
  },
  {
    label: '广东省',
    value: '440000',
    children: [
      {
        value: '440100',
        label: '广州市',
      },
      {
        value: '440200',
        label: '韶关市',
      },
      {
        value: '440300',
        label: '深圳市',
      },
      {
        value: '440400',
        label: '珠海市',
      },
      {
        value: '440500',
        label: '汕头市',
      },
      {
        value: '440600',
        label: '佛山市',
      },
      {
        value: '440700',
        label: '江门市',
      },
      {
        value: '440800',
        label: '湛江市',
      },
      {
        value: '440900',
        label: '茂名市',
      },
      {
        value: '441200',
        label: '肇庆市',
      },
      {
        value: '441300',
        label: '惠州市',
      },
      {
        value: '441400',
        label: '梅州市',
      },
      {
        value: '441500',
        label: '汕尾市',
      },
      {
        value: '441600',
        label: '河源市',
      },
      {
        value: '441700',
        label: '阳江市',
      },
      {
        value: '441800',
        label: '清远市',
      },
      {
        value: '441900',
        label: '东莞市',
      },
      {
        value: '442000',
        label: '中山市',
      },
      {
        value: '445100',
        label: '潮州市',
      },
      {
        value: '445200',
        label: '揭阳市',
      },
      {
        value: '445300',
        label: '云浮市',
      },
    ],
  },
]

export { areaList }
