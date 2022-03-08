import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, gql } from "apollo-angular";
import { Feed } from '../feed.model';
import { Detail } from "../detail.model";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getQuery: any;
  getQueryDetail: any;

  constructor(private http:HttpClient, private apollo:Apollo) {
    this.getQuery = gql`
    query{
      getAllFeedUrls{
        _id
        feedUrl
      }
    }
    `;

    this.getQueryDetail = gql`
    query{
            getAllFeedDetails{
                feedTitle
                _id
            }
        }
    `;
  }

  postFeed(data:any){
    const result =  this.apollo.mutate({
      mutation: gql`
      mutation createFeedUrl($input: CreateFeedUrlInput!){
        createFeedUrl(input: $input){
          _id
          feedUrl
        }
      }
      `,
      variables: {
        input: data
      },
      update: (store, result: any) => {
        const dataFromStore: any  = store.readQuery({ query: this.getQuery });
        const newData = [...dataFromStore.getAllFeedUrls, result.data.createFeedUrl] as [Feed];
        store.writeQuery({ query: this.getQuery,  data: { getAllFeedUrls: newData}  });
      }
    })

    return result;
  }

  getFeeds(){
    const result = this.apollo.query({
      query: gql`
      query{
        getAllFeedUrls{
          _id
          feedUrl
        }
      }
      `
    });
    return result;
  }

  updateFeed(id:any, data:any){
    return this.apollo.mutate({
      mutation: gql`
      mutation($input: String!, $feedUrl: CreateFeedUrlInput!)
      {
          updateFeedUrl(input: $input, feedUrl: $feedUrl){
              _id
              feedUrl
          }
      }
      `,
      variables: {
        input: id,
        feedUrl: data
      }
    })
  }

  deleteFeed(id:any){
    return this.apollo.mutate({
      mutation: gql`
      mutation deleteFeedUrl($input: String!){
        deleteFeedUrl(input: $input){
          _id
          feedUrl
        }
      }
      `,
      variables: {
        input: id
      },
      update: (store, result) => {
        const dataFromStore: any  = store.readQuery({ query: this.getQuery });
        const newData = dataFromStore.getAllFeedUrls.filter((item: any) => item._id !== id) as [Feed];
        store.writeQuery({ query: this.getQuery,  data: { getAllFeedUrls: newData}  });
      }
    })
  }

  getFeedDetails(){
    return this.apollo.watchQuery({
      query: gql`
      query{
        getAllFeedDetails{
          _id
          feedUrl
          feedDate
          feedAuthor
          feedTitle
          feedDescription  
        }
      }
      `,
    }).valueChanges;
  }

  

  postFeedDetail(data:any){
    const result =  this.apollo.mutate({
      mutation: gql`
      mutation createFeedDetail($input: CreateFeedDetailInput!){
            createFeedDetail(input: $input){
                _id
                feedTitle
            }
        }
      `,
      variables: {
        input: data
      },
      update: (store, result: any) => {
        const dataFromStore: any  = store.readQuery({ query: this.getQueryDetail });
        const newData = [...dataFromStore.getAllFeedDetails, result.data.createFeedDetail] as [Detail];
        store.writeQuery({ query: this.getQueryDetail,  data: { getAllFeedDetails: newData}  });
      }
    })

    return result;
  }


  deleteFeedDetail(id:any){
    return this.apollo.mutate({
      mutation: gql`
     mutation deleteFeedDetail($input: String!){
            deleteFeedDetail(input: $input){
                _id
                feedTitle
            }
        }
      `,
      variables: {
        input: id
      },
      update: (store, result) => {
        const dataFromStore: any  = store.readQuery({ query: this.getQueryDetail });
        const newData = dataFromStore.getAllFeedDetails.filter((item: any) => item._id !== id) as [Detail];
        store.writeQuery({ query: this.getQueryDetail,  data: { getAllFeedDetails: newData}  });
      }
    })
  }







}
