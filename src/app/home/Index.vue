<template>
  <div>
    <h3>{{data.name}}</h3>
    <div class="description">{{data.description}}</div>
    <h4>基本配置</h4>
    <dl class="baseconfig">
      <dt>URL:</dt>
      <dd>{{data.URL}}</dd>
    </dl>
    <dl class="baseconfig">
      <dt>基础参数:</dt>
      <dd>
        <pre>{{baseconfig}}</pre>
      </dd>
    </dl>
    <div class="tags">
      <ul>
        <li v-for="(item,index) in tags">
          <h5 @click="showChildren(item)">
            <b>{{index + 1}}、{{item.name}}</b>
            <span>{{item.description}}</span>
          </h5>
          <ol v-if="item.show">
            <li v-for="(o,i) in services" v-if="o.tag == item.id">
              <h6>
                <span class="nmbers">{{i + 1}}、</span>
                <span class="method">post</span>
                <span class="name">{{o.id}}</span>
                <b>{{o.name}}</b>
                <p>{{o.description}}</p>
              </h6>
              <div></div>
            </li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import json from '../../../data/config.json'
  export default {
    name: 'homeIndex',
    data () {
      return {
        data: json
      }
    },
    computed: {
      baseconfig () {
        return JSON.stringify(this.data.params, function (k, v) {
          return v
        }, 2)
      },
      tags () {
        this.data.tags = this.data.tags.map((item, index) => {
          item = Object.assign({}, item, {show: false})
          return item
        })
        return this.data.tags
      },
      services () {
        return this.data.services
      }
    },
    methods: {
      showChildren (item) {
        this.$set(item, "show", !item.show)
      }
    }
  }
</script>
<style scoped lang="scss">
  h3 {
    margin: 20px 0;
  }

  .description {
    color: #999;
    font-size: 14px;
  }

  h4 {
    margin: 10px 0;
  }

  .baseconfig {
    padding-bottom: 10px;
    overflow: hidden;
    dt, dd {
      float: left;
    }
    dt {
      width: 100px;
    }
  }

  pre {
    padding: 5px;
    background-color: #f0f0f0;
    line-height: 2;
  }

  .tags {
    margin-top: 10px;
    ul > li + li {
      border-top: 1px solid #f0f0f0;
    }
    ul > li {
      h5 {
        line-height: 40px;
        overflow: hidden;
        cursor: pointer;
        b {
          float: left;
        }
        span {
          float: right;
          color: #999;
        }
      }
      ol {
        li {
          h6 {
            line-height: 35px;
            overflow: hidden;
            p {
              float: right;
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
