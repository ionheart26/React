import React, { Component } from 'react';
import './App.css';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import TOC from './components/TOC';
import Control from './components/Control';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:null,
      subject:{title:'HELLO', sub:'coming through!'},
      welcome:{title:'Welcome', desc:'Click what you want'},
      contents:[
        {id:1, title:'HTML', desc:'HITMdf'},
        {id:2, title:'or here?', desc:'hi'},
        {id:3, title:'gotcha', desc: 'like a ninja'},
      ]
    }
  }

  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'read'){
      var data = this.state.contents.find(x => x['id'] === this.state.selected_content_id);
      _title = data.title;
      _desc = data.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id+1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          mode:'read',
          selected_content_id:this.max_content_id,
          contents:_contents,
        });
      }.bind(this)}></CreateContent>
    }
    else if(this.state.mode === 'update'){
      data = this.state.contents.find(x => x['id'] === this.state.selected_content_id);
      _article = <UpdateContent data={data} onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var index = this.state.contents.findIndex(x => x['id'] === _id);
        _contents[index] = {id:_id, title:_title, desc:_desc};
        this.setState({
          mode:'read',
          contents:_contents,
        });
      }.bind(this)}></UpdateContent>
    } 
    return _article;
  }

  render() {
    return (
      <div className="App">
        Spidey Sense@!
        <Subject
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}>
        </Subject>
        <TOC
          data={this.state.contents}
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:id,
            });
          }.bind(this)}></TOC>
        <Control onChangeMode={function(mode){
          if(mode === 'delete'){
            if(window.confirm('you sure?')){
              var _contents = Array.from(this.state.contents);
              var index = this.state.contents.findIndex(x => x['id'] === this.state.selected_content_id);
              _contents.splice(index, 1);
              this.setState({
                mode:'welcome',
                contents:_contents,
              });
              alert('deleted');
            }
          }
          else
            this.setState({mode:mode})
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
