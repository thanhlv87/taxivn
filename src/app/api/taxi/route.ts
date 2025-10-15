import { NextRequest, NextResponse } from 'next/server'

interface TaxiCompany {
  id: string
  name: string
  phone: string
  image: string
}

const taxiData: { [key: string]: TaxiCompany[] } = {
  '1': [ // Hà Nội
    { id: '1', name: 'Taxi Mai Linh', phone: '024.38616161', image: '/taxi-logos/mai-linh.png' },
    { id: '2', name: 'Taxi Group', phone: '024.38222222', image: '/taxi-logos/group.png' },
    { id: '3', name: 'Taxi ABC', phone: '024.38615151', image: '/taxi-logos/abc.png' },
    { id: '4', name: 'Taxi Thành Công', phone: '024.38353535', image: '/taxi-logos/thanh-cong.png' },
    { id: '5', name: 'Taxi Nội Bài', phone: '024.38888888', image: '/taxi-logos/mai-linh.png' },
    { id: '6', name: 'Taxi Eco', phone: '024.38454545', image: '/taxi-logos/abc.png' },
    { id: '7', name: 'Taxi Sun', phone: '024.38767676', image: '/taxi-logos/group.png' }
  ],
  '2': [ // TP.HCM
    { id: '8', name: 'Taxi Vinasun', phone: '028.38272727', image: '/taxi-logos/vinasun.png' },
    { id: '9', name: 'Taxi Mai Linh', phone: '028.38393939', image: '/taxi-logos/mai-linh.png' },
    { id: '10', name: 'Taxi Thành Công', phone: '028.38424242', image: '/taxi-logos/thanh-cong.png' },
    { id: '11', name: 'Taxi Sài Gòn', phone: '028.38444444', image: '/taxi-logos/group.png' },
    { id: '12', name: 'Taxi ABC', phone: '028.38555555', image: '/taxi-logos/abc.png' },
    { id: '13', name: 'Taxi G7', phone: '028.38666666', image: '/taxi-logos/mai-linh.png' },
    { id: '14', name: 'Taxi Petrolimex', phone: '028.38777777', image: '/taxi-logos/vinasun.png' }
  ],
  '3': [ // Đà Nẵng
    { id: '15', name: 'Taxi Mai Linh', phone: '0236.3828282', image: '/taxi-logos/mai-linh.png' },
    { id: '16', name: 'Taxi Tiên Sa', phone: '0236.3838383', image: '/taxi-logos/tien-sa.png' },
    { id: '17', name: 'Taxi Vinasun', phone: '0236.3848484', image: '/taxi-logos/vinasun.png' },
    { id: '18', name: 'Taxi Đà Nẵng', phone: '0236.3858585', image: '/taxi-logos/tien-sa.png' },
    { id: '19', name: 'Taxi Song Hàn', phone: '0236.3869696', image: '/taxi-logos/abc.png' }
  ],
  '4': [ // Hải Phòng
    { id: '20', name: 'Taxi Mai Linh', phone: '0225.3828282', image: '/taxi-logos/mai-linh.png' },
    { id: '21', name: 'Taxi Hải Phòng', phone: '0225.3838383', image: '/taxi-logos/group.png' },
    { id: '22', name: 'Taxi Dũng Thanh', phone: '0225.3848484', image: '/taxi-logos/abc.png' },
    { id: '23', name: 'Taxi ABC', phone: '0225.3858585', image: '/taxi-logos/abc.png' }
  ],
  '5': [ // Cần Thơ
    { id: '24', name: 'Taxi Mai Linh', phone: '0292.3828282', image: '/taxi-logos/mai-linh.png' },
    { id: '25', name: 'Taxi Cần Thơ', phone: '0292.3838383', image: '/taxi-logos/group.png' },
    { id: '26', name: 'Taxi Giấy Phút', phone: '0292.3848484', image: '/taxi-logos/abc.png' },
    { id: '27', name: 'Taxi ABC', phone: '0292.3858585', image: '/taxi-logos/abc.png' }
  ],
  '6': [ // An Giang
    { id: '28', name: 'Taxi An Giang', phone: '0296.3828282', image: '/taxi-logos/group.png' },
    { id: '29', name: 'Taxi Mai Linh', phone: '0296.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '30', name: 'Taxi Long Phụng', phone: '0296.3848484', image: '/taxi-logos/abc.png' }
  ],
  '7': [ // Bà Rịa - Vũng Tàu
    { id: '31', name: 'Taxi Vũng Tàu', phone: '0254.3828282', image: '/taxi-logos/group.png' },
    { id: '32', name: 'Taxi Mai Linh', phone: '0254.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '33', name: 'Taxi Petro', phone: '0254.3848484', image: '/taxi-logos/vinasun.png' }
  ],
  '8': [ // Bắc Giang
    { id: '34', name: 'Taxi Bắc Giang', phone: '0204.3828282', image: '/taxi-logos/group.png' },
    { id: '35', name: 'Taxi Mai Linh', phone: '0204.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '9': [ // Bắc Kạn
    { id: '36', name: 'Taxi Bắc Kạn', phone: '0281.3828282', image: '/taxi-logos/group.png' },
    { id: '37', name: 'Taxi Mai Linh', phone: '0281.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '10': [ // Bạc Liêu
    { id: '38', name: 'Taxi Bạc Liêu', phone: '0291.3828282', image: '/taxi-logos/group.png' },
    { id: '39', name: 'Taxi Mai Linh', phone: '0291.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '11': [ // Bắc Ninh
    { id: '40', name: 'Taxi Bắc Ninh', phone: '0222.3828282', image: '/taxi-logos/group.png' },
    { id: '41', name: 'Taxi Mai Linh', phone: '0222.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '42', name: 'Taxi Kinh Đô', phone: '0222.3848484', image: '/taxi-logos/abc.png' }
  ],
  '12': [ // Bến Tre
    { id: '43', name: 'Taxi Bến Tre', phone: '0275.3828282', image: '/taxi-logos/group.png' },
    { id: '44', name: 'Taxi Mai Linh', phone: '0275.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '13': [ // Bình Định
    { id: '45', name: 'Taxi Bình Định', phone: '0256.3828282', image: '/taxi-logos/group.png' },
    { id: '46', name: 'Taxi Mai Linh', phone: '0256.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '47', name: 'Taxi Quy Nhơn', phone: '0256.3848484', image: '/taxi-logos/abc.png' }
  ],
  '14': [ // Bình Dương
    { id: '48', name: 'Taxi Bình Dương', phone: '0274.3828282', image: '/taxi-logos/group.png' },
    { id: '49', name: 'Taxi Mai Linh', phone: '0274.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '50', name: 'Taxi Petrolimex', phone: '0274.3848484', image: '/taxi-logos/vinasun.png' }
  ],
  '15': [ // Bình Phước
    { id: '51', name: 'Taxi Bình Phước', phone: '0271.3828282', image: '/taxi-logos/group.png' },
    { id: '52', name: 'Taxi Mai Linh', phone: '0271.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '16': [ // Bình Thuận
    { id: '53', name: 'Taxi Bình Thuận', phone: '0252.3828282', image: '/taxi-logos/group.png' },
    { id: '54', name: 'Taxi Mai Linh', phone: '0252.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '55', name: 'Taxi Phan Thiết', phone: '0252.3848484', image: '/taxi-logos/abc.png' }
  ],
  '17': [ // Cà Mau
    { id: '56', name: 'Taxi Cà Mau', phone: '0290.3828282', image: '/taxi-logos/group.png' },
    { id: '57', name: 'Taxi Mai Linh', phone: '0290.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '18': [ // Cao Bằng
    { id: '58', name: 'Taxi Cao Bằng', phone: '026.3828282', image: '/taxi-logos/group.png' },
    { id: '59', name: 'Taxi Mai Linh', phone: '026.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '19': [ // Đắk Lắk
    { id: '60', name: 'Taxi Đắk Lắk', phone: '0262.3828282', image: '/taxi-logos/group.png' },
    { id: '61', name: 'Taxi Mai Linh', phone: '0262.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '62', name: 'Taxi Buôn Ma Thuột', phone: '0262.3848484', image: '/taxi-logos/abc.png' }
  ],
  '20': [ // Đắk Nông
    { id: '63', name: 'Taxi Đắk Nông', phone: '0261.3828282', image: '/taxi-logos/group.png' },
    { id: '64', name: 'Taxi Mai Linh', phone: '0261.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '21': [ // Điện Biên
    { id: '65', name: 'Taxi Điện Biên', phone: '023.3828282', image: '/taxi-logos/group.png' },
    { id: '66', name: 'Taxi Mai Linh', phone: '023.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '22': [ // Đồng Nai
    { id: '67', name: 'Taxi Đồng Nai', phone: '0251.3828282', image: '/taxi-logos/group.png' },
    { id: '68', name: 'Taxi Mai Linh', phone: '0251.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '69', name: 'Taxi Biên Hòa', phone: '0251.3848484', image: '/taxi-logos/abc.png' }
  ],
  '23': [ // Đồng Tháp
    { id: '70', name: 'Taxi Đồng Tháp', phone: '0277.3828282', image: '/taxi-logos/group.png' },
    { id: '71', name: 'Taxi Mai Linh', phone: '0277.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '24': [ // Gia Lai
    { id: '72', name: 'Taxi Gia Lai', phone: '0269.3828282', image: '/taxi-logos/group.png' },
    { id: '73', name: 'Taxi Mai Linh', phone: '0269.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '74', name: 'Taxi Pleiku', phone: '0269.3848484', image: '/taxi-logos/abc.png' }
  ],
  '25': [ // Hà Giang
    { id: '75', name: 'Taxi Hà Giang', phone: '0219.3828282', image: '/taxi-logos/group.png' },
    { id: '76', name: 'Taxi Mai Linh', phone: '0219.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '26': [ // Hà Nam
    { id: '77', name: 'Taxi Hà Nam', phone: '0226.3828282', image: '/taxi-logos/group.png' },
    { id: '78', name: 'Taxi Mai Linh', phone: '0226.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '27': [ // Hà Tĩnh
    { id: '79', name: 'Taxi Hà Tĩnh', phone: '0239.3828282', image: '/taxi-logos/group.png' },
    { id: '80', name: 'Taxi Mai Linh', phone: '0239.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '28': [ // Hải Dương
    { id: '81', name: 'Taxi Hải Dương', phone: '0220.3828282', image: '/taxi-logos/group.png' },
    { id: '82', name: 'Taxi Mai Linh', phone: '0220.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '83', name: 'Taxi Thái Dương', phone: '0220.3848484', image: '/taxi-logos/abc.png' }
  ],
  '29': [ // Hậu Giang
    { id: '84', name: 'Taxi Hậu Giang', phone: '0293.3828282', image: '/taxi-logos/group.png' },
    { id: '85', name: 'Taxi Mai Linh', phone: '0293.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '30': [ // Hòa Bình
    { id: '86', name: 'Taxi Hòa Bình', phone: '0218.3828282', image: '/taxi-logos/group.png' },
    { id: '87', name: 'Taxi Mai Linh', phone: '0218.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '31': [ // Hưng Yên
    { id: '88', name: 'Taxi Hưng Yên', phone: '0221.3828282', image: '/taxi-logos/group.png' },
    { id: '89', name: 'Taxi Mai Linh', phone: '0221.3838383', image: '/taxi-logos/mai-linh.png' }
  ],
  '32': [ // Khánh Hòa
    { id: '90', name: 'Taxi Khánh Hòa', phone: '0258.3828282', image: '/taxi-logos/group.png' },
    { id: '91', name: 'Taxi Mai Linh', phone: '0258.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '92', name: 'Taxi Nha Trang', phone: '0258.3848484', image: '/taxi-logos/abc.png' }
  ],
  '33': [ // Kiên Giang
    { id: '93', name: 'Taxi Kiên Giang', phone: '0297.3828282', image: '/taxi-logos/group.png' },
    { id: '94', name: 'Taxi Mai Linh', phone: '0297.3838383', image: '/taxi-logos/mai-linh.png' },
    { id: '95', name: 'Taxi Phú Quốc', phone: '0297.3848484', image: '/taxi-logos/abc.png' }
  ],
  '34': [ // Kon Tum
    { id: '96', name: 'Taxi Kon Tum', phone: '0260.3828282', image: '/taxi-logos/group.png' },
    { id: '97', name: 'Taxi Mai Linh', phone: '0260.3838383', image: '/taxi-logos/mai-linh.png' }
  ]
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const provinceId = searchParams.get('provinceId')

  if (!provinceId) {
    return NextResponse.json(
      { error: 'Province ID is required' },
      { status: 400 }
    )
  }

  const companies = taxiData[provinceId] || []

  return NextResponse.json({
    success: true,
    data: companies,
    count: companies.length
  })
}