import {
  kakaoAddressApiInstance,
  kakaoGeoApiInstance,
} from "@/shared/api/instance";
import type {
  KakaoLocationSearchResponse,
  SearchLocationParams,
  Location,
  KakaoLocationDocument,
  GetLocationWithCoordinatesParams,
} from "../types";

const convertLocationDocument = (doc: KakaoLocationDocument): Location => {
  return {
    id: `${doc.x}-${doc.y}-${doc.address_name}`,
    addressName: doc.address_name,
    latitude: parseFloat(doc.y),
    longitude: parseFloat(doc.x),
    addressType: doc.address_type,
    region1Depth: doc.address.region_1depth_name,
    region2Depth: doc.address.region_2depth_name,
    region3Depth: doc.address.region_3depth_name,
    roadName: doc.road_address?.road_name,
    buildingName: doc.road_address?.building_name,
  };
};
export const getLocationWithAddress = async (
  params: SearchLocationParams,
): Promise<Location[]> => {
  const { query, page = 1, size = 10 } = params;

  const response =
    await kakaoAddressApiInstance.get<KakaoLocationSearchResponse>("", {
      params: {
        query,
        page,
        size,
      },
    });

  return response.data.documents.map(convertLocationDocument);
};

export const getLocationWithCoordinates = async (
  params: GetLocationWithCoordinatesParams,
): Promise<Location[]> => {
  const { latitude, longitude, page = 1, size = 10 } = params;

  const response = await kakaoGeoApiInstance.get<KakaoLocationSearchResponse>(
    "/v2/local/geo/coord2address",
    {
      params: {
        x: longitude, // 🔥 중요
        y: latitude, // 🔥 중요
        page,
        size,
      },
    },
  );

  return response.data.documents.map(convertLocationDocument);
};
