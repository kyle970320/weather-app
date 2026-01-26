export interface KakaoLocationDocument {
  address_name: string;
  y: string;
  x: string;
  address_type: "REGION" | "ROAD" | "REGION_ADDR" | "ROAD_ADDR";
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_3depth_h_name: string;
    h_code: string;
    b_code: string;
    mountain_yn: "Y" | "N";
    main_address_no: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
  road_address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: "Y" | "N";
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
    x: string;
    y: string;
  };
}

export interface KakaoLocationSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: KakaoLocationDocument[];
}

export interface SearchLocationParams {
  query: string;
  page?: number;
  size?: number;
  enabled?: boolean;
}

export interface Location {
  id: string;
  addressName: string;
  latitude: number;
  longitude: number;
  addressType: "REGION" | "ROAD" | "REGION_ADDR" | "ROAD_ADDR";
  region1Depth: string;
  region2Depth: string;
  region3Depth: string;
  roadName?: string;
  buildingName?: string;
}
