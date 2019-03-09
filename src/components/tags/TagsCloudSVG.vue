<template>
  <div class="tags-cloud">
    <div id="tags-cloud__svg-wrapper" />

    <v-progress-circular
      v-if="loading"
      color="primary"
      indeterminate
    />

    <!--<canvas-->
    <!--ref="tagsCanvas"-->
    <!--width="960"-->
    <!--height="500"-->
    <!--style="border:1px solid #000000; width: 960px; height: 500px;"-->
    <!--/>-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import cloud from 'd3-cloud/build/d3.layout.cloud'
import * as d3 from 'd3'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
// import ComputedNoCache from '~/tools/decorators/ComputedNoCache'

@Component
export default class TagsCloudSVG extends Vue {
  @Prop(Array) tags!: any[]
  @Prop(Object) observer!: any

  public tagsData: any[] = []
  public loading: boolean = false

  get width () {
    return this.$el.clientWidth
  }

  get height () {
    return this.$el.clientHeight
  }

  mounted () {
    this.observer.$on('regenerate', () => {
      setTimeout(this.generate.bind(this), 500)
    })

    this.generate()
    // determines wheter to show or hide the elements in svg
    // function toogleFade (show, d) {
    //   let element = d3.select(this)
    //   let svg = d3.select('#svg-node')
    //   let time1 = 700
    //   let time2 = 1000
    //   show = !!show
    //   element.attr({ 'class': show ? 'current' : null, 'data-role': 'animation' })
    //     .transition()
    //     .duration(time1)
    //     .attr('transform', 'translate(' + [d.x, d.y] + ')rotate(' + (show ? 0 : d.rotate) + ')scale(' + (+!show || 3) + ')')
    //     .each('end', function () {
    //       show && setTimeout(function () {
    //         // alert('tag: ' + d.text)
    //       }, time2 - time1)
    //     })
    //   svg.selectAll("text:not([data-role='animation'])")
    //     .transition()
    //     .duration(time2)
    //     .style('opacity', +!show)
    //     .style('visibility', show ? 'hidden' : 'visible')
    //     .each('end', function () { element.attr('data-role', null) })
    // }// end toogleFade

    // cloud().size([960, 500])
    //   // .canvas(function () { return new Canvas(1, 1) })
    //   .canvas(this.$refs.tagsCanvas)
    //   .words(words)
    //   .padding(5)
    //   .rotate(function () { return ~~(Math.random() * 2) * 90 })
    //   // .font('Impact')
    //   .fontSize(function (d) { return d.size })
    //   .on('end', end)
    //   .start()
    //
    // function end (words) {
    //   // console.log(JSON.stringify(words))
    // }
  }

  // @ComputedNoCache
  getTagsData () {
    // const data = ['Hello', 'world', 'normally', 'you', 'want', 'more', 'words', 'than', 'this', 'qualify',
    //   'mix', 'timetable', 'amber', 'lonely', 'continental', 'merit', 'gas', 'sympathetic', 'extreme', 'latest',
    //   'major', 'cucumber', 'draft', 'Venus', 'conception', 'shatter', 'decade',
    //   'wood', 'constitution', 'fresh', 'watch', 'accountant', 'integrated', 'mountain', 'prevalence', 'choose',
    //   'white', 'news', 'apology', 'overlook', 'plug', 'quit'
    // ]
    const minFontSize = 20
    const maxFontSize = 76
    const maxPostsCount = Math.max(
      ...this.tags.map(i => i.postsCount)
    )

    return this.tags.map(i => ({
      ...i,
      text: i.name,
      size: Math.max(
        minFontSize,
        (i.postsCount / maxPostsCount) * maxFontSize
      )
    }))
  }

  generate () {
    const wrapper = document.querySelector('#tags-cloud__svg-wrapper')

    this.tagsData = this.getTagsData()
    this.loading = true

    // remove content
    if (wrapper) wrapper.innerHTML = ''

    cloud()
      .size([
        this.width,
        this.height
      ])
      .words(this.tagsData)
      .spiral('rectangular')
      .padding(2) // 6
      .rotate(() => (~~(Math.random() * 2) * -30) || 60)
      // .text(function (d) { return d.text; })
      .font('Impact')
      .fontSize(d => d.size)
      .on('end', this.draw.bind(this))
      .start()
  }

  draw () {
    const vueVm = this
    let fill = d3.scale.category20b()
    let svg = d3.select('#tags-cloud__svg-wrapper').append('svg').attr({
      width: this.width,
      height: this.height,
      id: 'svg-node'
    })

    let vis = svg.append('g').attr('transform', 'translate(' + [this.width >> 1, (this.height >> 1) - 10] + ')scale(2)')
    let text = vis.selectAll('text').data(this.tagsData)
    text.enter().append('text')
      .style('font-family', d => d.font)
      .style('font-size', (d) => d.size + 'px')
      .style('fill', (d, i) => fill(i))
      .style({ cursor: 'pointer', opacity: 1e-6 })
      .attr('text-anchor', 'middle')
      .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
      .text(d => d.text)
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(500)
          .style('opacity', 0.8)
          .style('font-size', d => d.size + 5 + 'px')

        vueVm.$emit('tag-mouseover', d)
      })
      .on('mouseout', function (d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 1)
          .style('font-size', d => d.size - 5 + 'px')

        vueVm.$emit('tag-mouseout', d)
      })
      .on('click', d => {
        this.$emit('tag-click', d)
      })
      // .on('click', function (d) {
      //   // [this] is the <text> element of svg
      //   let show = !this.classList.contains('current')
      //   toogleFade.apply(this, [show, d])
      // })
      .transition()
      .duration(1000)
      .style('opacity', 1)

    vis.transition()
      .delay(450)
      .duration(750)
      .attr('transform', 'translate(' + [this.width >> 1, (this.height >> 1) + 10] + ')scale(1)')

    this.loading = false
  }
}
</script>

<style lang="stylus">
  .tags-cloud
    .legend
      border: 1px solid #555555;
      border-radius: 5px 5px 5px 5px;
      font-size: 0.8em;
      margin: 10px;
      padding: 8px;

    .bld
      font-weight: bold;

    #tags-cloud__svg-wrapper
      width: 100%;
      height: 100%;
</style>
