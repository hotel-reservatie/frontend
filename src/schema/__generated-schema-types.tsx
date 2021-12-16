import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FiltersResponse = {
  __typename?: 'FiltersResponse';
  maxCapacity?: Maybe<Scalars['Float']>;
  roomTypes?: Maybe<Array<RoomType>>;
  tags?: Maybe<Array<Tag>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addReview?: Maybe<Review>;
  createReservation: Reservation;
  deleteReservation: Scalars['String'];
  deleteReview: Scalars['String'];
  toggleFavorite: Scalars['String'];
  updateReview: Review;
};


export type MutationAddReviewArgs = {
  data: NewReviewInput;
};


export type MutationCreateReservationArgs = {
  data: NewReservationInput;
  roomIds: Array<Scalars['String']>;
};


export type MutationDeleteReservationArgs = {
  reservationId: Scalars['String'];
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['String'];
};


export type MutationToggleFavoriteArgs = {
  roomId: Scalars['String'];
};


export type MutationUpdateReviewArgs = {
  data: ReviewUpdateInput;
  reviewId: Scalars['String'];
};

export type NewReservationInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate: Scalars['DateTime'];
  reservationId?: Maybe<Scalars['ID']>;
  roomsReserved?: Maybe<Array<RoomReservedInput>>;
  startDate: Scalars['DateTime'];
  totalAmountOfDays?: Maybe<Scalars['Float']>;
  totalAmountOfPeople?: Maybe<Scalars['Float']>;
  totalPrice?: Maybe<Scalars['Float']>;
  user?: Maybe<UserInput>;
  weekendDays?: Maybe<Scalars['Float']>;
};

export type NewReviewInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  reviewId?: Maybe<Scalars['ID']>;
  reviewScore: Scalars['Float'];
  room: ReviewRoomInput;
  title: Scalars['String'];
  user?: Maybe<UserInput>;
};

export type Query = {
  __typename?: 'Query';
  getAllRooms?: Maybe<Array<Room>>;
  getFilters: FiltersResponse;
  getReservation: Reservation;
  getRoomById?: Maybe<Room>;
  getRoomReviews: Array<Review>;
  getRoomTypes: Array<RoomTypeResponse>;
  getRooms?: Maybe<Array<Room>>;
  getUserFavorites: Array<Room>;
  getUserReservations: Array<Reservation>;
  getUserReviews?: Maybe<Array<Review>>;
  validateReservation: ValidateReservationResponse;
};


export type QueryGetReservationArgs = {
  data: Scalars['String'];
};


export type QueryGetRoomByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetRoomReviewsArgs = {
  roomId: Scalars['String'];
};


export type QueryGetRoomsArgs = {
  Filters?: Maybe<RoomFilters>;
};


export type QueryValidateReservationArgs = {
  data: NewReservationInput;
  roomIds: Array<Scalars['String']>;
};

export type Reservation = {
  __typename?: 'Reservation';
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate: Scalars['DateTime'];
  reservationId?: Maybe<Scalars['ID']>;
  roomsReserved?: Maybe<Array<RoomReserved>>;
  startDate: Scalars['DateTime'];
  totalAmountOfDays?: Maybe<Scalars['Float']>;
  totalAmountOfPeople?: Maybe<Scalars['Float']>;
  totalPrice?: Maybe<Scalars['Float']>;
  user?: Maybe<User>;
  weekendDays?: Maybe<Scalars['Float']>;
};

export type ReservationInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  endDate: Scalars['DateTime'];
  reservationId?: Maybe<Scalars['ID']>;
  roomsReserved?: Maybe<Array<RoomReservedInput>>;
  startDate: Scalars['DateTime'];
  totalAmountOfDays?: Maybe<Scalars['Float']>;
  totalAmountOfPeople?: Maybe<Scalars['Float']>;
  totalPrice?: Maybe<Scalars['Float']>;
  user?: Maybe<UserInput>;
  weekendDays?: Maybe<Scalars['Float']>;
};

export type Review = {
  __typename?: 'Review';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  reviewId?: Maybe<Scalars['ID']>;
  reviewScore: Scalars['Float'];
  room: Room;
  title: Scalars['String'];
  user?: Maybe<User>;
};

export type ReviewInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  reviewId?: Maybe<Scalars['ID']>;
  reviewScore: Scalars['Float'];
  room: RoomInput;
  title: Scalars['String'];
  user?: Maybe<UserInput>;
};

export type ReviewRoomInput = {
  roomId: Scalars['ID'];
};

export type ReviewUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  reviewId?: Maybe<Scalars['ID']>;
  reviewScore?: Maybe<Scalars['Float']>;
  room?: Maybe<ReviewRoomInput>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<UserInput>;
};

export type Room = {
  __typename?: 'Room';
  currentPrice?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  facilities?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<Scalars['String']>>;
  reviews?: Maybe<Array<Review>>;
  roomId?: Maybe<Scalars['ID']>;
  roomName?: Maybe<Scalars['String']>;
  roomType: RoomType;
  surface?: Maybe<Scalars['Float']>;
  tags?: Maybe<Array<Tag>>;
  weekendMultiplier?: Maybe<Scalars['Float']>;
};

export type RoomFilters = {
  endDate?: Maybe<Scalars['DateTime']>;
  maxCapacity?: Maybe<Scalars['Float']>;
  maxPrice?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
  roomIds?: Maybe<Array<Scalars['String']>>;
  roomName?: Maybe<Scalars['String']>;
  roomTypeIds?: Maybe<Array<Scalars['String']>>;
  startDate?: Maybe<Scalars['DateTime']>;
  tagIds?: Maybe<Array<Scalars['String']>>;
};

export type RoomInput = {
  currentPrice?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  facilities?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<Scalars['String']>>;
  reviews?: Maybe<Array<ReviewInput>>;
  roomId?: Maybe<Scalars['ID']>;
  roomName?: Maybe<Scalars['String']>;
  roomType: RoomTypeInput;
  surface?: Maybe<Scalars['Float']>;
  tags?: Maybe<Array<TagInput>>;
  weekendMultiplier?: Maybe<Scalars['Float']>;
};

export type RoomReserved = {
  __typename?: 'RoomReserved';
  price: Scalars['Float'];
  reservation: Reservation;
  room: Room;
  roomReservedId: Scalars['String'];
};

export type RoomReservedInput = {
  price: Scalars['Float'];
  reservation: ReservationInput;
  room: RoomInput;
  roomReservedId: Scalars['String'];
};

export type RoomType = {
  __typename?: 'RoomType';
  capacity: Scalars['Float'];
  description: Scalars['String'];
  roomTypeId?: Maybe<Scalars['ID']>;
  sampleImage?: Maybe<Scalars['String']>;
  typeName: Scalars['String'];
};

export type RoomTypeInput = {
  capacity: Scalars['Float'];
  description: Scalars['String'];
  roomTypeId?: Maybe<Scalars['ID']>;
  sampleImage?: Maybe<Scalars['String']>;
  typeName: Scalars['String'];
};

export type RoomTypeResponse = {
  __typename?: 'RoomTypeResponse';
  capacity: Scalars['Float'];
  description: Scalars['String'];
  roomTypeId?: Maybe<Scalars['ID']>;
  sampleImage?: Maybe<Scalars['String']>;
  startingPrice?: Maybe<Scalars['Float']>;
  typeName: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
  tagId?: Maybe<Scalars['ID']>;
};

export type TagInput = {
  name: Scalars['String'];
  tagId?: Maybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['Float']>;
  reservationEmail?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type UserInput = {
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['Float']>;
  reservationEmail?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type ValidateReservationResponse = {
  __typename?: 'ValidateReservationResponse';
  invalidRooms?: Maybe<Array<Scalars['String']>>;
  isValid: Scalars['Boolean'];
  totalDays?: Maybe<Scalars['Float']>;
  totalPrice: Scalars['Float'];
  weekendDays?: Maybe<Scalars['Float']>;
};

export type GetUserFavoritesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFavoritesQuery = { __typename?: 'Query', getUserFavorites: Array<{ __typename?: 'Room', roomId?: string | null | undefined, images?: Array<string> | null | undefined, roomName?: string | null | undefined, currentPrice?: number | null | undefined, surface?: number | null | undefined, description?: string | null | undefined, roomType: { __typename?: 'RoomType', capacity: number } }> };

export type ToggleFavoriteMutationVariables = Exact<{
  roomId: Scalars['String'];
}>;


export type ToggleFavoriteMutation = { __typename?: 'Mutation', toggleFavorite: string };

export type GetAllFilterValuesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFilterValuesQuery = { __typename?: 'Query', getFilters: { __typename?: 'FiltersResponse', maxCapacity?: number | null | undefined, roomTypes?: Array<{ __typename?: 'RoomType', typeName: string, roomTypeId?: string | null | undefined }> | null | undefined, tags?: Array<{ __typename?: 'Tag', name: string, tagId?: string | null | undefined }> | null | undefined } };

export type CreateReservationMutationVariables = Exact<{
  newReservation: NewReservationInput;
  roomIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateReservationMutation = { __typename?: 'Mutation', createReservation: { __typename?: 'Reservation', reservationId?: string | null | undefined, createdAt?: any | null | undefined, startDate: any, endDate: any, totalPrice?: number | null | undefined, user?: { __typename?: 'User', userName?: string | null | undefined } | null | undefined, roomsReserved?: Array<{ __typename?: 'RoomReserved', roomReservedId: string, price: number, room: { __typename?: 'Room', roomName?: string | null | undefined, currentPrice?: number | null | undefined, weekendMultiplier?: number | null | undefined } }> | null | undefined } };

export type DeleteReservationMutationVariables = Exact<{
  reservationId: Scalars['String'];
}>;


export type DeleteReservationMutation = { __typename?: 'Mutation', deleteReservation: string };

export type GetReservationQueryVariables = Exact<{
  reservationId: Scalars['String'];
}>;


export type GetReservationQuery = { __typename?: 'Query', getReservation: { __typename?: 'Reservation', reservationId?: string | null | undefined, startDate: any, endDate: any, totalPrice?: number | null | undefined, totalAmountOfDays?: number | null | undefined, weekendDays?: number | null | undefined, roomsReserved?: Array<{ __typename?: 'RoomReserved', price: number, room: { __typename?: 'Room', roomId?: string | null | undefined, roomName?: string | null | undefined, surface?: number | null | undefined, currentPrice?: number | null | undefined, weekendMultiplier?: number | null | undefined, roomType: { __typename?: 'RoomType', capacity: number } } }> | null | undefined } };

export type GetUserReservationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserReservationsQuery = { __typename?: 'Query', getUserReservations: Array<{ __typename?: 'Reservation', reservationId?: string | null | undefined, startDate: any, endDate: any, totalPrice?: number | null | undefined, roomsReserved?: Array<{ __typename?: 'RoomReserved', room: { __typename?: 'Room', roomName?: string | null | undefined } }> | null | undefined }> };

export type ValidateReservationQueryVariables = Exact<{
  roomIds: Array<Scalars['String']> | Scalars['String'];
  newReservation: NewReservationInput;
}>;


export type ValidateReservationQuery = { __typename?: 'Query', validateReservation: { __typename?: 'ValidateReservationResponse', isValid: boolean, invalidRooms?: Array<string> | null | undefined, totalPrice: number, totalDays?: number | null | undefined, weekendDays?: number | null | undefined } };

export type AddReviewMutationVariables = Exact<{
  reviewInput: NewReviewInput;
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview?: { __typename?: 'Review', reviewId?: string | null | undefined, reviewScore: number, title: string, description?: string | null | undefined, createdAt?: any | null | undefined } | null | undefined };

export type DeleteReviewMutationVariables = Exact<{
  reviewId: Scalars['String'];
}>;


export type DeleteReviewMutation = { __typename?: 'Mutation', deleteReview: string };

export type GetAllRoomTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRoomTypesQuery = { __typename?: 'Query', getRoomTypes: Array<{ __typename?: 'RoomTypeResponse', roomTypeId?: string | null | undefined, typeName: string, description: string, capacity: number, sampleImage?: string | null | undefined, startingPrice?: number | null | undefined }> };

export type GetAllRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRoomsQuery = { __typename?: 'Query', getAllRooms?: Array<{ __typename?: 'Room', roomId?: string | null | undefined, roomName?: string | null | undefined, description?: string | null | undefined, surface?: number | null | undefined, currentPrice?: number | null | undefined, weekendMultiplier?: number | null | undefined, images?: Array<string> | null | undefined, tags?: Array<{ __typename?: 'Tag', name: string }> | null | undefined }> | null | undefined };

export type GetFilteredRoomsQueryVariables = Exact<{
  roomFilter?: Maybe<RoomFilters>;
}>;


export type GetFilteredRoomsQuery = { __typename?: 'Query', getRooms?: Array<{ __typename?: 'Room', roomId?: string | null | undefined, roomName?: string | null | undefined, images?: Array<string> | null | undefined, description?: string | null | undefined, surface?: number | null | undefined, currentPrice?: number | null | undefined, weekendMultiplier?: number | null | undefined, roomType: { __typename?: 'RoomType', capacity: number } }> | null | undefined };

export type GetRoomByIdQueryVariables = Exact<{
  roomId: Scalars['String'];
}>;


export type GetRoomByIdQuery = { __typename?: 'Query', getRoomById?: { __typename?: 'Room', roomId?: string | null | undefined, roomName?: string | null | undefined, facilities?: Array<string> | null | undefined, description?: string | null | undefined, images?: Array<string> | null | undefined, surface?: number | null | undefined, currentPrice?: number | null | undefined, roomType: { __typename?: 'RoomType', typeName: string, description: string }, tags?: Array<{ __typename?: 'Tag', name: string }> | null | undefined, reviews?: Array<{ __typename?: 'Review', reviewId?: string | null | undefined, title: string, description?: string | null | undefined, reviewScore: number, createdAt?: any | null | undefined, user?: { __typename?: 'User', userId?: string | null | undefined, userName?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined };


export const GetUserFavoritesDocument = gql`
    query getUserFavorites {
  getUserFavorites {
    roomId
    images
    roomName
    currentPrice
    roomType {
      capacity
    }
    surface
    description
  }
}
    `;

/**
 * __useGetUserFavoritesQuery__
 *
 * To run a query within a React component, call `useGetUserFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFavoritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserFavoritesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserFavoritesQuery, GetUserFavoritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFavoritesQuery, GetUserFavoritesQueryVariables>(GetUserFavoritesDocument, options);
      }
export function useGetUserFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFavoritesQuery, GetUserFavoritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFavoritesQuery, GetUserFavoritesQueryVariables>(GetUserFavoritesDocument, options);
        }
export type GetUserFavoritesQueryHookResult = ReturnType<typeof useGetUserFavoritesQuery>;
export type GetUserFavoritesLazyQueryHookResult = ReturnType<typeof useGetUserFavoritesLazyQuery>;
export type GetUserFavoritesQueryResult = Apollo.QueryResult<GetUserFavoritesQuery, GetUserFavoritesQueryVariables>;
export const ToggleFavoriteDocument = gql`
    mutation toggleFavorite($roomId: String!) {
  toggleFavorite(roomId: $roomId)
}
    `;
export type ToggleFavoriteMutationFn = Apollo.MutationFunction<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;

/**
 * __useToggleFavoriteMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteMutation, { data, loading, error }] = useToggleFavoriteMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useToggleFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>(ToggleFavoriteDocument, options);
      }
export type ToggleFavoriteMutationHookResult = ReturnType<typeof useToggleFavoriteMutation>;
export type ToggleFavoriteMutationResult = Apollo.MutationResult<ToggleFavoriteMutation>;
export type ToggleFavoriteMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;
export const GetAllFilterValuesDocument = gql`
    query getAllFilterValues {
  getFilters {
    roomTypes {
      typeName
      roomTypeId
    }
    tags {
      name
      tagId
    }
    maxCapacity
  }
}
    `;

/**
 * __useGetAllFilterValuesQuery__
 *
 * To run a query within a React component, call `useGetAllFilterValuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFilterValuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFilterValuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFilterValuesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllFilterValuesQuery, GetAllFilterValuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFilterValuesQuery, GetAllFilterValuesQueryVariables>(GetAllFilterValuesDocument, options);
      }
export function useGetAllFilterValuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFilterValuesQuery, GetAllFilterValuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFilterValuesQuery, GetAllFilterValuesQueryVariables>(GetAllFilterValuesDocument, options);
        }
export type GetAllFilterValuesQueryHookResult = ReturnType<typeof useGetAllFilterValuesQuery>;
export type GetAllFilterValuesLazyQueryHookResult = ReturnType<typeof useGetAllFilterValuesLazyQuery>;
export type GetAllFilterValuesQueryResult = Apollo.QueryResult<GetAllFilterValuesQuery, GetAllFilterValuesQueryVariables>;
export const CreateReservationDocument = gql`
    mutation createReservation($newReservation: NewReservationInput!, $roomIds: [String!]!) {
  createReservation(data: $newReservation, roomIds: $roomIds) {
    reservationId
    user {
      userName
    }
    createdAt
    startDate
    endDate
    totalPrice
    roomsReserved {
      roomReservedId
      price
      room {
        roomName
        currentPrice
        weekendMultiplier
      }
    }
  }
}
    `;
export type CreateReservationMutationFn = Apollo.MutationFunction<CreateReservationMutation, CreateReservationMutationVariables>;

/**
 * __useCreateReservationMutation__
 *
 * To run a mutation, you first call `useCreateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReservationMutation, { data, loading, error }] = useCreateReservationMutation({
 *   variables: {
 *      newReservation: // value for 'newReservation'
 *      roomIds: // value for 'roomIds'
 *   },
 * });
 */
export function useCreateReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateReservationMutation, CreateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReservationMutation, CreateReservationMutationVariables>(CreateReservationDocument, options);
      }
export type CreateReservationMutationHookResult = ReturnType<typeof useCreateReservationMutation>;
export type CreateReservationMutationResult = Apollo.MutationResult<CreateReservationMutation>;
export type CreateReservationMutationOptions = Apollo.BaseMutationOptions<CreateReservationMutation, CreateReservationMutationVariables>;
export const DeleteReservationDocument = gql`
    mutation deleteReservation($reservationId: String!) {
  deleteReservation(reservationId: $reservationId)
}
    `;
export type DeleteReservationMutationFn = Apollo.MutationFunction<DeleteReservationMutation, DeleteReservationMutationVariables>;

/**
 * __useDeleteReservationMutation__
 *
 * To run a mutation, you first call `useDeleteReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReservationMutation, { data, loading, error }] = useDeleteReservationMutation({
 *   variables: {
 *      reservationId: // value for 'reservationId'
 *   },
 * });
 */
export function useDeleteReservationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReservationMutation, DeleteReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReservationMutation, DeleteReservationMutationVariables>(DeleteReservationDocument, options);
      }
export type DeleteReservationMutationHookResult = ReturnType<typeof useDeleteReservationMutation>;
export type DeleteReservationMutationResult = Apollo.MutationResult<DeleteReservationMutation>;
export type DeleteReservationMutationOptions = Apollo.BaseMutationOptions<DeleteReservationMutation, DeleteReservationMutationVariables>;
export const GetReservationDocument = gql`
    query getReservation($reservationId: String!) {
  getReservation(data: $reservationId) {
    reservationId
    startDate
    endDate
    totalPrice
    totalAmountOfDays
    weekendDays
    roomsReserved {
      price
      room {
        roomId
        roomName
        roomType {
          capacity
        }
        surface
        currentPrice
        weekendMultiplier
      }
    }
  }
}
    `;

/**
 * __useGetReservationQuery__
 *
 * To run a query within a React component, call `useGetReservationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReservationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReservationQuery({
 *   variables: {
 *      reservationId: // value for 'reservationId'
 *   },
 * });
 */
export function useGetReservationQuery(baseOptions: Apollo.QueryHookOptions<GetReservationQuery, GetReservationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReservationQuery, GetReservationQueryVariables>(GetReservationDocument, options);
      }
export function useGetReservationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReservationQuery, GetReservationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReservationQuery, GetReservationQueryVariables>(GetReservationDocument, options);
        }
export type GetReservationQueryHookResult = ReturnType<typeof useGetReservationQuery>;
export type GetReservationLazyQueryHookResult = ReturnType<typeof useGetReservationLazyQuery>;
export type GetReservationQueryResult = Apollo.QueryResult<GetReservationQuery, GetReservationQueryVariables>;
export const GetUserReservationsDocument = gql`
    query getUserReservations {
  getUserReservations {
    reservationId
    startDate
    endDate
    totalPrice
    roomsReserved {
      room {
        roomName
      }
    }
  }
}
    `;

/**
 * __useGetUserReservationsQuery__
 *
 * To run a query within a React component, call `useGetUserReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserReservationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserReservationsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserReservationsQuery, GetUserReservationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserReservationsQuery, GetUserReservationsQueryVariables>(GetUserReservationsDocument, options);
      }
export function useGetUserReservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserReservationsQuery, GetUserReservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserReservationsQuery, GetUserReservationsQueryVariables>(GetUserReservationsDocument, options);
        }
export type GetUserReservationsQueryHookResult = ReturnType<typeof useGetUserReservationsQuery>;
export type GetUserReservationsLazyQueryHookResult = ReturnType<typeof useGetUserReservationsLazyQuery>;
export type GetUserReservationsQueryResult = Apollo.QueryResult<GetUserReservationsQuery, GetUserReservationsQueryVariables>;
export const ValidateReservationDocument = gql`
    query validateReservation($roomIds: [String!]!, $newReservation: NewReservationInput!) {
  validateReservation(roomIds: $roomIds, data: $newReservation) {
    isValid
    invalidRooms
    totalPrice
    totalDays
    weekendDays
  }
}
    `;

/**
 * __useValidateReservationQuery__
 *
 * To run a query within a React component, call `useValidateReservationQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateReservationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateReservationQuery({
 *   variables: {
 *      roomIds: // value for 'roomIds'
 *      newReservation: // value for 'newReservation'
 *   },
 * });
 */
export function useValidateReservationQuery(baseOptions: Apollo.QueryHookOptions<ValidateReservationQuery, ValidateReservationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateReservationQuery, ValidateReservationQueryVariables>(ValidateReservationDocument, options);
      }
export function useValidateReservationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateReservationQuery, ValidateReservationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateReservationQuery, ValidateReservationQueryVariables>(ValidateReservationDocument, options);
        }
export type ValidateReservationQueryHookResult = ReturnType<typeof useValidateReservationQuery>;
export type ValidateReservationLazyQueryHookResult = ReturnType<typeof useValidateReservationLazyQuery>;
export type ValidateReservationQueryResult = Apollo.QueryResult<ValidateReservationQuery, ValidateReservationQueryVariables>;
export const AddReviewDocument = gql`
    mutation addReview($reviewInput: NewReviewInput!) {
  addReview(data: $reviewInput) {
    reviewId
    reviewScore
    title
    description
    createdAt
  }
}
    `;
export type AddReviewMutationFn = Apollo.MutationFunction<AddReviewMutation, AddReviewMutationVariables>;

/**
 * __useAddReviewMutation__
 *
 * To run a mutation, you first call `useAddReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReviewMutation, { data, loading, error }] = useAddReviewMutation({
 *   variables: {
 *      reviewInput: // value for 'reviewInput'
 *   },
 * });
 */
export function useAddReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddReviewMutation, AddReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReviewMutation, AddReviewMutationVariables>(AddReviewDocument, options);
      }
export type AddReviewMutationHookResult = ReturnType<typeof useAddReviewMutation>;
export type AddReviewMutationResult = Apollo.MutationResult<AddReviewMutation>;
export type AddReviewMutationOptions = Apollo.BaseMutationOptions<AddReviewMutation, AddReviewMutationVariables>;
export const DeleteReviewDocument = gql`
    mutation deleteReview($reviewId: String!) {
  deleteReview(reviewId: $reviewId)
}
    `;
export type DeleteReviewMutationFn = Apollo.MutationFunction<DeleteReviewMutation, DeleteReviewMutationVariables>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useDeleteReviewMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReviewMutation, DeleteReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, options);
      }
export type DeleteReviewMutationHookResult = ReturnType<typeof useDeleteReviewMutation>;
export type DeleteReviewMutationResult = Apollo.MutationResult<DeleteReviewMutation>;
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<DeleteReviewMutation, DeleteReviewMutationVariables>;
export const GetAllRoomTypesDocument = gql`
    query getAllRoomTypes {
  getRoomTypes {
    roomTypeId
    typeName
    description
    capacity
    sampleImage
    startingPrice
  }
}
    `;

/**
 * __useGetAllRoomTypesQuery__
 *
 * To run a query within a React component, call `useGetAllRoomTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRoomTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRoomTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRoomTypesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRoomTypesQuery, GetAllRoomTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRoomTypesQuery, GetAllRoomTypesQueryVariables>(GetAllRoomTypesDocument, options);
      }
export function useGetAllRoomTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRoomTypesQuery, GetAllRoomTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRoomTypesQuery, GetAllRoomTypesQueryVariables>(GetAllRoomTypesDocument, options);
        }
export type GetAllRoomTypesQueryHookResult = ReturnType<typeof useGetAllRoomTypesQuery>;
export type GetAllRoomTypesLazyQueryHookResult = ReturnType<typeof useGetAllRoomTypesLazyQuery>;
export type GetAllRoomTypesQueryResult = Apollo.QueryResult<GetAllRoomTypesQuery, GetAllRoomTypesQueryVariables>;
export const GetAllRoomsDocument = gql`
    query getAllRooms {
  getAllRooms {
    roomId
    roomName
    description
    surface
    tags {
      name
    }
    currentPrice
    weekendMultiplier
    images
  }
}
    `;

/**
 * __useGetAllRoomsQuery__
 *
 * To run a query within a React component, call `useGetAllRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRoomsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRoomsQuery, GetAllRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRoomsQuery, GetAllRoomsQueryVariables>(GetAllRoomsDocument, options);
      }
export function useGetAllRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRoomsQuery, GetAllRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRoomsQuery, GetAllRoomsQueryVariables>(GetAllRoomsDocument, options);
        }
export type GetAllRoomsQueryHookResult = ReturnType<typeof useGetAllRoomsQuery>;
export type GetAllRoomsLazyQueryHookResult = ReturnType<typeof useGetAllRoomsLazyQuery>;
export type GetAllRoomsQueryResult = Apollo.QueryResult<GetAllRoomsQuery, GetAllRoomsQueryVariables>;
export const GetFilteredRoomsDocument = gql`
    query getFilteredRooms($roomFilter: RoomFilters) {
  getRooms(Filters: $roomFilter) {
    roomId
    roomName
    images
    description
    surface
    currentPrice
    weekendMultiplier
    roomType {
      capacity
    }
  }
}
    `;

/**
 * __useGetFilteredRoomsQuery__
 *
 * To run a query within a React component, call `useGetFilteredRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredRoomsQuery({
 *   variables: {
 *      roomFilter: // value for 'roomFilter'
 *   },
 * });
 */
export function useGetFilteredRoomsQuery(baseOptions?: Apollo.QueryHookOptions<GetFilteredRoomsQuery, GetFilteredRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilteredRoomsQuery, GetFilteredRoomsQueryVariables>(GetFilteredRoomsDocument, options);
      }
export function useGetFilteredRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilteredRoomsQuery, GetFilteredRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilteredRoomsQuery, GetFilteredRoomsQueryVariables>(GetFilteredRoomsDocument, options);
        }
export type GetFilteredRoomsQueryHookResult = ReturnType<typeof useGetFilteredRoomsQuery>;
export type GetFilteredRoomsLazyQueryHookResult = ReturnType<typeof useGetFilteredRoomsLazyQuery>;
export type GetFilteredRoomsQueryResult = Apollo.QueryResult<GetFilteredRoomsQuery, GetFilteredRoomsQueryVariables>;
export const GetRoomByIdDocument = gql`
    query getRoomById($roomId: String!) {
  getRoomById(id: $roomId) {
    roomId
    roomName
    facilities
    description
    images
    surface
    currentPrice
    roomType {
      typeName
      description
    }
    tags {
      name
    }
    reviews {
      reviewId
      title
      description
      reviewScore
      createdAt
      user {
        userId
        userName
      }
    }
  }
}
    `;

/**
 * __useGetRoomByIdQuery__
 *
 * To run a query within a React component, call `useGetRoomByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomByIdQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGetRoomByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRoomByIdQuery, GetRoomByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomByIdQuery, GetRoomByIdQueryVariables>(GetRoomByIdDocument, options);
      }
export function useGetRoomByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomByIdQuery, GetRoomByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomByIdQuery, GetRoomByIdQueryVariables>(GetRoomByIdDocument, options);
        }
export type GetRoomByIdQueryHookResult = ReturnType<typeof useGetRoomByIdQuery>;
export type GetRoomByIdLazyQueryHookResult = ReturnType<typeof useGetRoomByIdLazyQuery>;
export type GetRoomByIdQueryResult = Apollo.QueryResult<GetRoomByIdQuery, GetRoomByIdQueryVariables>;