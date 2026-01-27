import {
  kakaoAddressApiInstance,
  kakaoGeoApiInstance,
} from "@/shared/api/instance";

import type {
  KakaoAddressResponse,
  KakaoAddressParams,
  Location,
  KakaoAddressDocument,
  KakaoGeoParams,
  KakaoGeoDocument,
  KakaoGeoResponse,
  KakaoGeoRoadDocument,
} from "../types";

import { convertGeo } from "@/shared/utils/convertGeo";

const convertAddressDocument = (doc: KakaoAddressDocument): Location => {
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

const convertGeoDocument = (doc: KakaoGeoDocument | KakaoGeoRoadDocument) => {
  if ("road_address" in doc) {
    return {
      id: `${doc.address?.address_name}`,
      addressName: `${doc.address?.region_1depth_name} ${doc.address?.region_2depth_name} ${doc.address?.region_3depth_name}`,
      region1Depth: doc.address?.region_1depth_name || "",
      region2Depth: doc.address?.region_2depth_name || "",
      region3Depth: doc.address?.region_3depth_name || "",
      latitude: 0,
      longitude: 0,
    };
  }
  const gridCoordinates = convertGeo(doc.x, doc.y);
  return {
    id: `${doc.x}-${doc.y}-${doc.address_name}`,
    addressName: doc?.address_name,
    latitude: gridCoordinates?.ny,
    longitude: gridCoordinates?.nx,
    region1Depth: doc.region_1depth_name,
    region2Depth: doc.region_2depth_name,
    region3Depth: doc.region_3depth_name,
  };
};

export const getAddress = async (
  params: KakaoAddressParams,
): Promise<Location[]> => {
  const { query, page = 1, size = 10 } = params;

  const response = await kakaoAddressApiInstance.get<KakaoAddressResponse>("", {
    params: {
      query,
      page,
      size,
    },
  });

  return response.data.documents.map(convertAddressDocument);
};

export const getGeo = async (params: KakaoGeoParams): Promise<Location[]> => {
  const { latitude, longitude, page = 1, size = 10 } = params;

  const response = await kakaoGeoApiInstance.get<KakaoGeoResponse>("", {
    params: {
      x: longitude,
      y: latitude,
      page,
      size,
    },
  });

  return response.data.documents.map(convertGeoDocument);
};
