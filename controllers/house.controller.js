import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {House} from "../models/house.model.js";
import {Address} from "../models/address.model.js";
import {Owner} from "../models/owner.model.js";

const setHouse = asyncHandler( async ( req, res ) =>
{
    const {house_type, address, price, negotiable, owner_details, status} = req.body
    console.log( req.body )
    if ( !price )
    {
        throw new ApiError( 400, "All fields required" )
    }
    if ( [ house_type, address, negotiable, owner_details, status ].some( ( field ) => field === '' ) )
    {
        throw new ApiError( 400, "All fields required" )
    }

    const existedHouse = await House.findOne( {house_type} )
    if ( existedHouse )
    {
        throw new ApiError( 409, "House already exist" )
    }
    // console.log( "jthdsf" );
    const addressOfHouse = await Address.create( address )
    // console.log( "jthdsf" );
    const addressid = addressOfHouse._id
    const owner = await Owner.create( owner_details )
    const ownerid = owner._id
    const house = await House.create( {
        house_type, address: addressid, price, negotiable, owner_details: ownerid, status
    } )
    const createdHouse = await House.findById( house._id )
    if ( !createdHouse )
    {
        throw new ApiError( 500, "Something went wrong while registering" )
    }
    return res.status( 201 ).json(
        new ApiResponse( 200, createdHouse, "House Registered" )
    )
} )

const getHouse = asyncHandler( async ( req, res ) =>
{
    const {house_type, status} = req.body
    const house = await House.findOne( {house_type: house_type, status: status} )
    if ( !house )
    {
        throw new ApiError( 400, "House doesnot exist" )
    }
    const existedHouse = await House.findById( house._id ).populate( 'address' ).populate( 'owner_details' );
    return res.status( 201 ).json(
        new ApiResponse( 200, existedHouse )
    )
} )

const getHouses = asyncHandler( async ( req, res ) =>
{
    const existedHouses = await House.find().populate( 'address' ).populate( 'owner_details' );
    if ( !existedHouses )
    {
        throw new ApiError( 404, "No House present" );
    }
    return res.status( 201 ).json(
        new ApiResponse( 200, existedHouses )
    )
} )

export
{
    setHouse,
    getHouse,
    getHouses
}