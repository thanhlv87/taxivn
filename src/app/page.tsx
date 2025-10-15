'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Phone, Loader2 } from 'lucide-react'

interface TaxiCompany {
  id: string
  name: string
  phone: string
  image: string
}

interface Province {
  id: string
  name: string
  code: string
}

const provinces: Province[] = [
  { id: '1', name: 'Hà Nội', code: 'HN' },
  { id: '2', name: 'TP. Hồ Chí Minh', code: 'HCM' },
  { id: '3', name: 'Đà Nẵng', code: 'DN' },
  { id: '4', name: 'Hải Phòng', code: 'HP' },
  { id: '5', name: 'Cần Thơ', code: 'CT' },
  { id: '6', name: 'An Giang', code: 'AG' },
  { id: '7', name: 'Bà Rịa - Vũng Tàu', code: 'BV' },
  { id: '8', name: 'Bắc Giang', code: 'BG' },
  { id: '9', name: 'Bắc Kạn', code: 'BK' },
  { id: '10', name: 'Bạc Liêu', code: 'BL' },
  { id: '11', name: 'Bắc Ninh', code: 'BN' },
  { id: '12', name: 'Bến Tre', code: 'BT' },
  { id: '13', name: 'Bình Định', code: 'BD' },
  { id: '14', name: 'Bình Dương', code: 'BĐ' },
  { id: '15', name: 'Bình Phước', code: 'BP' },
  { id: '16', name: 'Bình Thuận', code: 'BT' },
  { id: '17', name: 'Cà Mau', code: 'CM' },
  { id: '18', name: 'Cao Bằng', code: 'CB' },
  { id: '19', name: 'Đắk Lắk', code: 'ĐL' },
  { id: '20', name: 'Đắk Nông', code: 'ĐN' },
  { id: '21', name: 'Điện Biên', code: 'ĐB' },
  { id: '22', name: 'Đồng Nai', code: 'ĐN' },
  { id: '23', name: 'Đồng Tháp', code: 'ĐT' },
  { id: '24', name: 'Gia Lai', code: 'GL' },
  { id: '25', name: 'Hà Giang', code: 'HG' },
  { id: '26', name: 'Hà Nam', code: 'HN' },
  { id: '27', name: 'Hà Tĩnh', code: 'HT' },
  { id: '28', name: 'Hải Dương', code: 'HD' },
  { id: '29', name: 'Hậu Giang', code: 'HG' },
  { id: '30', name: 'Hòa Bình', code: 'HB' },
  { id: '31', name: 'Hưng Yên', code: 'HY' },
  { id: '32', name: 'Khánh Hòa', code: 'KH' },
  { id: '33', name: 'Kiên Giang', code: 'KG' },
  { id: '34', name: 'Kon Tum', code: 'KT' },
  { id: '35', name: 'Lai Châu', code: 'LC' },
  { id: '36', name: 'Lâm Đồng', code: 'LĐ' },
  { id: '37', name: 'Lạng Sơn', code: 'LS' },
  { id: '38', name: 'Lào Cai', code: 'LC' },
  { id: '39', name: 'Long An', code: 'LA' },
  { id: '40', name: 'Nam Định', code: 'ND' },
  { id: '41', name: 'Nghệ An', code: 'NA' },
  { id: '42', name: 'Ninh Bình', code: 'NB' },
  { id: '43', name: 'Ninh Thuận', code: 'NT' },
  { id: '44', name: 'Phú Thọ', code: 'PT' },
  { id: '45', name: 'Phú Yên', code: 'PY' },
  { id: '46', name: 'Quảng Bình', code: 'QB' },
  { id: '47', name: 'Quảng Nam', code: 'QN' },
  { id: '48', name: 'Quảng Ngãi', code: 'QG' },
  { id: '49', name: 'Quảng Ninh', code: 'QN' },
  { id: '50', name: 'Quảng Trị', code: 'QT' },
  { id: '51', name: 'Sóc Trăng', code: 'ST' },
  { id: '52', name: 'Sơn La', code: 'SL' },
  { id: '53', name: 'Tây Ninh', code: 'TN' },
  { id: '54', name: 'Thái Bình', code: 'TB' },
  { id: '55', name: 'Thái Nguyên', code: 'TNG' },
  { id: '56', name: 'Thanh Hóa', code: 'TH' },
  { id: '57', name: 'Thừa Thiên Huế', code: 'TTH' },
  { id: '58', name: 'Tiền Giang', code: 'TG' },
  { id: '59', name: 'Trà Vinh', code: 'TV' },
  { id: '60', name: 'Tuyên Quang', code: 'TQ' },
  { id: '61', name: 'Vĩnh Long', code: 'VL' },
  { id: '62', name: 'Vĩnh Phúc', code: 'VP' },
  { id: '63', name: 'Yên Bái', code: 'YB' }
]



export default function Home() {
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [taxiCompanies, setTaxiCompanies] = useState<TaxiCompany[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)

  const handleProvinceChange = async (provinceId: string) => {
    setSelectedProvince(provinceId)
    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/taxi?provinceId=${provinceId}`)
      const result = await response.json()
      
      if (result.success) {
        setTaxiCompanies(result.data)
      } else {
        setTaxiCompanies([])
      }
    } catch (error) {
      console.error('Error fetching taxi companies:', error)
      setTaxiCompanies([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleLocationDetection = () => {
    setLocationLoading(true)
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Simulate getting province from coordinates
          // In real app, you would use reverse geocoding API
          setTimeout(() => {
            // Default to Hà Nội for demo
            handleProvinceChange('1')
            setLocationLoading(false)
          }, 1000)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocationLoading(false)
          // Default to Hà Nội if location fails
          handleProvinceChange('1')
        }
      )
    } else {
      setLocationLoading(false)
      // Default to Hà Nội if geolocation not supported
      handleProvinceChange('1')
    }
  }

  const handleCallTaxi = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\./g, '')}`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full shadow-lg mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xs">TAXI</span>
              </div>
              <h1 className="text-xl font-bold">
                Taxi Việt Nam
              </h1>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Tìm và gọi taxi nhanh chóng tại 34 tỉnh thành
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleLocationDetection}
              disabled={locationLoading}
              className="w-full sm:w-auto"
            >
              {locationLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 mr-2" />
              )}
              Định vị
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* Taxi Companies Grid */}
        {!isLoading && taxiCompanies.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {taxiCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-200 transition-colors">
                      <img
                        src={company.image}
                        alt={company.name}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center hidden">
                        <span className="text-white font-bold text-xs">TAXI</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                        {company.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2 font-medium">
                        {company.phone}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleCallTaxi(company.phone)}
                        className="w-full text-xs h-8 bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Gọi ngay
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && selectedProvince && taxiCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có dữ liệu taxi
            </h3>
            <p className="text-gray-600">
              Hiện tại chưa có thông tin hãng taxi cho tỉnh này
            </p>
          </div>
        )}

        {/* Initial State */}
        {!selectedProvince && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chọn tỉnh/thành phố
            </h3>
            <p className="text-gray-600">
              Vui lòng chọn tỉnh/thành phố hoặc sử dụng tính năng định vị để tìm hãng taxi
            </p>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 Taxi Vietnam. Powered by ThanhLV87 & Z.ai</p>
          </div>
        </div>
      </div>
    </div>
  )
}