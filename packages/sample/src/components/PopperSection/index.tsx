import React, { useState, useRef } from "react";
import {
  Popper,
  PopperPlacement,
  PopperVariant,
  PopperType,
  PopperSize,
  Button,
  PopperTrigger,
  VirtualList,
  Avatar,
} from "@minerva/lib-core";
import styles from "./index.module.scss";

const PopperSection: React.FC = () => {
  const [activePopper, setActivePopper] = useState<string | null>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handlePopperToggle = (id: string) => {
    setActivePopper((prev) => (prev === id ? null : id));
  };

  // 位置选项
  const placements: PopperPlacement[] = [
    "top",
    "topStart",
    "topEnd",
    "bottom",
    "bottomStart",
    "bottomEnd",
    "left",
    "leftStart",
    "leftEnd",
    "right",
    "rightStart",
    "rightEnd",
  ];

  // 样式变体
  const variants: PopperVariant[] = [
    "default", // 默认样式
    "primary", // 主要样式
    "secondary", // 次要样式
    "success", // 成功样式
    "warning", // 警告样式
    "error", // 错误样式
  ];

  // 类型选项
  const types: PopperType[] = [
    "default", // 默认弹出层
    "menu", // 菜单类型
    "select", // 选择器类型
    "tooltip", // 提示类型
  ];

  // 尺寸选项
  const sizes: PopperSize[] = [
    "auto",
    "small", // 小尺寸
    "medium", // 中等尺寸
    "large", // 大尺寸
  ];

  // 自定义样式展示组
  const customStyles = [
    {
      id: "width-height",
      title: "自定义尺寸",
      style: {
        width: 300,
        height: 300,
        padding: "16px",
      },
    },
    {
      id: "max-size",
      title: "max-size 设置尺寸",
      style: {
        width: 300,
        maxHeight: 400,
        overflow: "auto",
      },
    },
    {
      id: "min-size",
      title: "最小尺寸",
      style: {
        minWidth: 150,
        minHeight: 80,
      },
    },
  ];

  // 箭头样式展示组
  const arrowStyles = [
    {
      id: "default-arrow",
      title: "默认箭头",
      props: { arrow: true },
    },
    {
      id: "colored-arrow",
      title: "彩色箭头",
      props: {
        arrow: true,
        popperStyle: {
          backgroundColor: "#1890ff",
          color: "#fff",
        },
      },
    },
  ];

  // 动画配置展示组
  const animations = [
    {
      id: "quick-fade",
      title: "快速淡入",
      animation: { duration: 100, easing: "ease-out" },
    },
    {
      id: "slow-bounce",
      title: "缓慢弹出",
      animation: {
        duration: 800,
        easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  ];

  // 位置偏移展示组
  const offsets = [
    {
      id: "offset-up",
      title: "向上偏移",
      offset: { x: 0, y: -20 },
    },
    {
      id: "offset-right",
      title: "向右偏移",
      offset: { x: 20, y: 0 },
    },
  ];

  // 尺寸展示的测试文本
  const longText =
    "这是一段很长的文本内容，用来测试不同尺寸下的文本展示效果。当文本内容超出容器宽度时，可以选择单行滚动或者多行折行显示。";

  // 添加菜单数据
  const menuItems = [
    { icon: "🏠", label: "首页", description: "返回首页" },
    { icon: "📝", label: "编辑", description: "编辑当前内容" },
    { icon: "💾", label: "保存", description: "保存更改" },
    { icon: "🗑️", label: "删除", description: "删除当前项" },
    { icon: "⚙️", label: "设置", description: "系统设置" },
    // ... 更多菜单项
  ].concat(
    Array(10)
      .fill(null)
      .map((_, i) => ({
        icon: "📄",
        label: `更多选项 ${i + 1}`,
        description: `额外选项描述 ${i + 1}`,
      })),
  );

  // 添加选择器数据
  const selectItems = Array(20)
    .fill(null)
    .map((_, i) => ({
      id: i,
      avatar: `https://i.pravatar.cc/40?img=${i}`,
      name: `用户 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: i % 3 === 0 ? "在线" : "离线",
    }));

  // 添加虚拟列表数据
  const virtualListItems = Array(1000)
    .fill(null)
    .map((_, i) => ({
      id: i,
      metadata: {
        avatar: `https://i.pravatar.cc/40?img=${i % 70}`,
        name: `用户 ${i + 1}`,
        email: `user${i + 1}@example.com`,
        activity: `最近活动 ${Math.floor(Math.random() * 24)} 小时前`,
      },
    }));

  // 更新 size 展示组
  const sizeExamples = [
    {
      id: "size-auto",
      title: "Auto Size",
      size: "auto" as const,
      content: "这是自动尺寸的 Popper，宽高会根据内容自动调整",
    },
    {
      id: "size-small",
      title: "Small Size",
      size: "small" as const,
      content: "这是一个小尺寸的 Popper，默认宽度 200px，高度 120px",
    },
    {
      id: "size-medium",
      title: "Medium Size",
      size: "medium" as const,
      content: "这是一个中等尺寸的 Popper，默认宽度 300px，高度 200px",
    },
    {
      id: "size-large",
      title: "Large Size",
      size: "large" as const,
      content: "这是一个大尺寸的 Popper，默认宽度 400px，高度 300px",
    },
  ];

  // 添加内容展示组
  const contentExamples = [
    {
      id: "auto-single",
      title: "Auto 单行",
      size: "auto" as const,
      multiline: false,
      content: "这是一段单行文本，超出部分会水平滚动而不是换行。".repeat(3),
      width: 300,
      height: "",
    },
    {
      id: "auto-multi",
      title: "Auto 多行",
      size: "auto" as const,
      multiline: true,
      content: "这是一段多行文本，会自动换行显示。".repeat(5),
      width: 300,
      height: 250,
    },
  ];

  return (
    <div className={styles.section}>
      {/* 基础用法 */}
      <h3>基础用法</h3>
      <div className={styles.group}>
        <div className={styles.demoContainer}>
          <Button
            ref={(el: HTMLButtonElement | null) =>
              (buttonRefs.current["basic"] = el)
            }
            onClick={() => handlePopperToggle("basic")}
          >
            基础 Popper
          </Button>
          <Popper
            visible={activePopper === "basic"}
            anchorEl={buttonRefs.current["basic"]}
            onClickAway={() => setActivePopper(null)}
          >
            <div className={styles.popperContent}>
              这是一个基础的 Popper 示例
            </div>
          </Popper>
        </div>
      </div>

      {/* 位置展示 */}
      <h3>位置展示</h3>
      <div className={styles.placementGrid}>
        {placements.map((placement) => (
          <div key={placement} className={styles.demoContainer}>
            <Button
              ref={(el: HTMLButtonElement | null) =>
                (buttonRefs.current[`placement-${placement}`] = el)
              }
              onClick={() => handlePopperToggle(`placement-${placement}`)}
            >
              {placement}
            </Button>
            <Popper
              visible={activePopper === `placement-${placement}`}
              anchorEl={buttonRefs.current[`placement-${placement}`]}
              placement={placement}
              arrow
              onClickAway={() => setActivePopper(null)}
            >
              <div className={styles.popperContent}>{placement} 位置</div>
            </Popper>
          </div>
        ))}
      </div>

      {/* 类型展示 */}
      <h3>类型展示</h3>
      <div className={styles.group}>
        {types.map((type) => (
          <div key={type} className={styles.demoContainer}>
            <Button
              ref={(el) => (buttonRefs.current[`type-${type}`] = el)}
              onClick={() => handlePopperToggle(`type-${type}`)}
            >
              {type} 类型
            </Button>
            <Popper
              visible={activePopper === `type-${type}`}
              anchorEl={buttonRefs.current[`type-${type}`]}
              type={type}
              height={["menu", "select"].includes(type) ? 400 : "auto"}
              arrow
              onClickAway={() => setActivePopper(null)}
            >
              {type === "menu" && (
                <div className={styles.menuContent}>
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className={`${styles.menuItem} ${index === 3 ? styles.disabled : ""}`}
                    >
                      <span className={styles.menuIcon}>{item.icon}</span>
                      <div className={styles.menuItemContent}>
                        <div className={styles.menuItemLabel}>{item.label}</div>
                        <div className={styles.menuItemDescription}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {type === "select" && (
                <div className={styles.selectContent}>
                  {selectItems.map((item) => (
                    <div key={item.id} className={styles.selectItem}>
                      <Avatar src={item.avatar} size="small" />
                      <div className={styles.selectItemContent}>
                        <div className={styles.selectItemName}>{item.name}</div>
                        <div className={styles.selectItemEmail}>
                          {item.email}
                        </div>
                      </div>
                      <span
                        className={`${styles.selectItemStatus} ${styles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {type === "tooltip" && (
                <div className={styles.tooltipContent}>这是一个提示信息</div>
              )}
              {type === "default" && (
                <div className={styles.defaultContent}>默认内容</div>
              )}
            </Popper>
          </div>
        ))}
      </div>

      {/* 尺寸展示 */}
      <h3>尺寸展示</h3>
      <h4>单行模式（横向滚动）</h4>
      <div className={styles.group}>
        {sizes.map((size) => (
          <div key={`single-${size}`} className={styles.demoContainer}>
            <Button
              ref={(el: HTMLButtonElement | null) =>
                (buttonRefs.current[`size-single-${size}`] = el)
              }
              onClick={() => handlePopperToggle(`size-single-${size}`)}
            >
              {size} 尺寸（单行）
            </Button>
            <Popper
              visible={activePopper === `size-single-${size}`}
              anchorEl={buttonRefs.current[`size-single-${size}`]}
              size={size}
              width={size === "auto" ? 200 : ""}
              height={size === "auto" ? "auto" : ""}
              arrow
              multiline={false}
              onClickAway={() => setActivePopper(null)}
            >
              <div className={styles.popperContent}>{longText}</div>
            </Popper>
          </div>
        ))}
      </div>

      <h4>多行模式（自动折行）</h4>
      <div className={styles.group}>
        {sizes.map((size) => (
          <div key={`multi-${size}`} className={styles.demoContainer}>
            <Button
              ref={(el: HTMLButtonElement | null) =>
                (buttonRefs.current[`size-multi-${size}`] = el)
              }
              onClick={() => handlePopperToggle(`size-multi-${size}`)}
            >
              {size} 尺寸（多行）
            </Button>
            <Popper
              visible={activePopper === `size-multi-${size}`}
              anchorEl={buttonRefs.current[`size-multi-${size}`]}
              size={size}
              width={size === "auto" ? 300 : ""}
              height={size === "auto" ? 200 : ""}
              arrow
              multiline
              onClickAway={() => setActivePopper(null)}
            >
              <div className={styles.popperContent}>{longText.repeat(20)}</div>
            </Popper>
          </div>
        ))}
      </div>

      {/* 样式变体 */}
      <h3>样式变体</h3>
      <div className={styles.group}>
        {variants.map((variant) => (
          <div key={variant} className={styles.demoContainer}>
            <Button
              ref={(el: HTMLButtonElement | null) =>
                (buttonRefs.current[`variant-${variant}`] = el)
              }
              onClick={() => handlePopperToggle(`variant-${variant}`)}
              variant={variant === "default" ? "retry" : variant}
            >
              {variant} 样式
            </Button>
            <Popper
              visible={activePopper === `variant-${variant}`}
              anchorEl={buttonRefs.current[`variant-${variant}`]}
              variant={variant}
              arrow
              onClickAway={() => setActivePopper(null)}
            >
              <div className={styles.popperContent}>
                {variant} 样式的 Popper
              </div>
            </Popper>
          </div>
        ))}
      </div>

      {/* 动画效果 */}
      <h3>动画效果</h3>
      <div className={styles.group}>
        <div className={styles.demoContainer}>
          <Button
            ref={(el: HTMLButtonElement | null) =>
              (buttonRefs.current["animation-fast"] = el)
            }
            onClick={() => handlePopperToggle("animation-fast")}
          >
            快速动画
          </Button>
          <Popper
            visible={activePopper === "animation-fast"}
            anchorEl={buttonRefs.current["animation-fast"]}
            animation={{ duration: 5000, easing: "ease-out" }}
            arrow
            onClickAway={() => setActivePopper(null)}
          >
            <div>快速动画效果</div>
          </Popper>
        </div>

        <div className={styles.demoContainer}>
          <Button
            ref={(el: HTMLButtonElement | null) =>
              (buttonRefs.current["animation-slow"] = el)
            }
            onClick={() => handlePopperToggle("animation-slow")}
          >
            慢速动画
          </Button>
          <Popper
            visible={activePopper === "animation-slow"}
            anchorEl={buttonRefs.current["animation-slow"]}
            animation={{ duration: 5000, easing: "ease-in-out" }}
            arrow
            onClickAway={() => setActivePopper(null)}
          >
            <div>慢速动画效果</div>
          </Popper>
        </div>
      </div>

      {/* 边界情况 */}
      <h3>边界情况</h3>
      <div className={styles.edgeCases}>
        {/* 溢出容器 */}
        <h4>溢出容器</h4>
        <div className={styles.overflowContainer}>
          <div className={styles.demoContainer}>
            <Button
              ref={(el: HTMLButtonElement | null) =>
                (buttonRefs.current["overflow"] = el)
              }
              onClick={() => handlePopperToggle("overflow")}
            >
              溢出测试
            </Button>
            <Popper
              visible={activePopper === "overflow"}
              anchorEl={buttonRefs.current["overflow"]}
              arrow
              onClickAway={() => setActivePopper(null)}
            >
              <div>测试溢出行为</div>
            </Popper>
          </div>
        </div>

        {/* 滚动容器 */}
        <h4>滚动容器</h4>
        <div className={styles.scrollContainer}>
          <div className={styles.scrollContent}>
            <div className={styles.demoContainer}>
              <Button
                ref={(el: HTMLButtonElement | null) =>
                  (buttonRefs.current["scroll"] = el)
                }
                onClick={() => handlePopperToggle("scroll")}
              >
                滚动测试
              </Button>
              <Popper
                visible={activePopper === "scroll"}
                anchorEl={buttonRefs.current["scroll"]}
                arrow
                onClickAway={() => setActivePopper(null)}
              >
                <div>测试滚动行为</div>
              </Popper>
            </div>
          </div>
        </div>

        {/* 嵌套 Popper */}
        <h4>嵌套 Popper</h4>
        <div className={styles.demoContainer}>
          <Button
            ref={(el: HTMLButtonElement | null) =>
              (buttonRefs.current["nested-1"] = el)
            }
            onClick={() => handlePopperToggle("nested-1")}
          >
            嵌套 Popper
          </Button>
          <Popper
            visible={activePopper === "nested-1"}
            anchorEl={buttonRefs.current["nested-1"]}
            arrow
            onClickAway={() => setActivePopper(null)}
          >
            <div style={{ padding: "8px" }}>
              <div>这是第一层 Popper</div>
              <Button
                ref={(el: HTMLButtonElement | null) =>
                  (buttonRefs.current["nested-2"] = el)
                }
                onClick={() => handlePopperToggle("nested-2")}
                style={{ marginTop: 8 }}
              >
                打开嵌套层
              </Button>
              <Popper
                visible={activePopper === "nested-2"}
                anchorEl={buttonRefs.current["nested-2"]}
                arrow
                onClickAway={() => setActivePopper(null)}
              >
                <div>嵌套的 Popper 内容</div>
              </Popper>
            </div>
          </Popper>
        </div>
      </div>

      {/* 自定义样式 */}
      <h3>自定义样式</h3>
      <div className={styles.group}>
        {customStyles.map(({ id, title, style }) => (
          <div key={id} className={styles.demoContainer}>
            <Button
              ref={(el: HTMLButtonElement | null) =>
                (buttonRefs.current[id] = el)
              }
              onClick={() => handlePopperToggle(id)}
            >
              {title}
            </Button>
            <Popper
              visible={activePopper === id}
              anchorEl={buttonRefs.current[id]}
              popperStyle={style}
              onClickAway={() => setActivePopper(null)}
            >
              <div>
                <h4>{title}</h4>
                <p>自定义样式示例内容</p>
                {style.overflow === "auto" && (
                  <div>
                    {Array(10)
                      .fill(null)
                      .map((_, i) => (
                        <p key={i}>滚动内容 {i + 1}</p>
                      ))}
                  </div>
                )}
              </div>
            </Popper>
          </div>
        ))}
      </div>

      {/* 箭头样式展示 */}
      <h3>箭头样式</h3>
      <div className={styles.group}>
        {arrowStyles.map(({ id, title, props }) => (
          <div key={id} className={styles.demoContainer}>
            <Button
              ref={(el: HTMLButtonElement | null) =>
                (buttonRefs.current[id] = el)
              }
              onClick={() => handlePopperToggle(id)}
            >
              {title}
            </Button>
            <Popper
              visible={activePopper === id}
              anchorEl={buttonRefs.current[id]}
              {...props}
              onClickAway={() => setActivePopper(null)}
            >
              <div>{title}</div>
            </Popper>
          </div>
        ))}
      </div>

      {/* 动画效果展示 */}
      <h3>动画效果</h3>
      <div className={styles.group}>
        {animations.map(({ id, title, animation }) => (
          <div key={id} className={styles.demoContainer}>
            <Button
              ref={(el: HTMLButtonElement | null) =>
                (buttonRefs.current[id] = el)
              }
              onClick={() => handlePopperToggle(id)}
            >
              {title}
            </Button>
            <Popper
              visible={activePopper === id}
              anchorEl={buttonRefs.current[id]}
              animation={animation}
              arrow
              onClickAway={() => setActivePopper(null)}
            >
              <div>{title}</div>
            </Popper>
          </div>
        ))}
      </div>

      {/* 位置偏移展示 */}
      <h3>位置偏移</h3>
      <div className={styles.group}>
        {offsets.map(({ id, title, offset }) => (
          <div key={id} className={styles.demoContainer}>
            <Button
              ref={(el: HTMLButtonElement | null) =>
                (buttonRefs.current[id] = el)
              }
              onClick={() => handlePopperToggle(id)}
            >
              {title}
            </Button>
            <Popper
              visible={activePopper === id}
              anchorEl={buttonRefs.current[id]}
              offset={offset}
              arrow
              onClickAway={() => setActivePopper(null)}
            >
              <div>{title}</div>
            </Popper>
          </div>
        ))}
      </div>

      {/* 开关动画展示 */}
      <h3>开关动画</h3>
      <div className={styles.group}>
        <div className={styles.demoContainer}>
          <Button
            ref={(el: HTMLButtonElement | null) =>
              (buttonRefs.current["toggle"] = el)
            }
            onClick={() => handlePopperToggle("toggle")}
          >
            切换显示
          </Button>
          <Popper
            visible={activePopper === "toggle"}
            anchorEl={buttonRefs.current["toggle"]}
            arrow
            animation={{ duration: 300, easing: "ease-in-out" }}
            onClickAway={() => setActivePopper(null)}
          >
            <div>点击按钮或外部区域关闭</div>
          </Popper>
        </div>
      </div>

      {/* 添加触发方式展示 */}
      <h3>触发方式</h3>
      <div className={styles.group}>
        {["hover", "click", "contextMenu", "focus", "manual"].map(
          (triggerType) => (
            <div key={triggerType} className={styles.demoContainer}>
              <Button
                ref={(el) =>
                  (buttonRefs.current[`trigger-${triggerType}`] = el)
                }
                onMouseEnter={() =>
                  triggerType === "hover" &&
                  handlePopperToggle(`trigger-${triggerType}`)
                }
                onMouseLeave={() =>
                  triggerType === "hover" && setActivePopper(null)
                }
                onClick={() =>
                  triggerType === "click" &&
                  handlePopperToggle(`trigger-${triggerType}`)
                }
                onContextMenu={(e) => {
                  if (triggerType === "contextMenu") {
                    e.preventDefault();
                    handlePopperToggle(`trigger-${triggerType}`);
                  }
                }}
                onFocus={() =>
                  triggerType === "focus" &&
                  handlePopperToggle(`trigger-${triggerType}`)
                }
                onBlur={() => triggerType === "focus" && setActivePopper(null)}
              >
                {triggerType} 触发
              </Button>
              <Popper
                visible={activePopper === `trigger-${triggerType}`}
                anchorEl={buttonRefs.current[`trigger-${triggerType}`]}
                trigger={triggerType as PopperTrigger}
                onVisibleChange={(visible) => {
                  console.log(`${triggerType} visibility changed:`, visible);
                  setActivePopper(visible ? `trigger-${triggerType}` : null);
                }}
                onClickAway={() => setActivePopper(null)}
              >
                <div>通过 {triggerType} 触发的内容</div>
              </Popper>
            </div>
          ),
        )}
      </div>

      {/* 滚动列表示例 */}
      <h3>虚拟滚动列表</h3>
      <div className={styles.group}>
        <div className={styles.demoContainer}>
          <Button
            ref={(el) => (buttonRefs.current["virtual-list"] = el)}
            onClick={() => handlePopperToggle("virtual-list")}
          >
            显示虚拟列表
          </Button>
          <Popper
            visible={activePopper === "virtual-list"}
            anchorEl={buttonRefs.current["virtual-list"]}
            scrollable={false} // 让 VirtualList 控制滚动
            popperStyle={{
              padding: 0, // 移除默认内边距
            }}
            width={300}
            height={400}
            onClickAway={() => setActivePopper(null)}
          >
            <VirtualList
              items={virtualListItems}
              maxHeight={400}
              itemHeight={72}
              renderItem={(item) => (
                <div className={styles.virtualListItem}>
                  <Avatar src={item.metadata?.avatar as string} size="medium" />
                  <div className={styles.virtualListItemContent}>
                    <div className={styles.virtualListItemHeader}>
                      <span className={styles.virtualListItemName}>
                        {item.metadata?.name}
                      </span>
                      <span className={styles.virtualListItemActivity}>
                        {item.metadata?.activity}
                      </span>
                    </div>
                    <div className={styles.virtualListItemEmail}>
                      {item.metadata?.email}
                    </div>
                  </div>
                </div>
              )}
            />
          </Popper>
        </div>
      </div>

      {/* 点击外部处理示例 */}
      <h3>点击外部处理</h3>
      <div className={styles.group}>
        <div className={styles.demoContainer}>
          <Button
            ref={(el) => (buttonRefs.current["clickaway"] = el)}
            onClick={() => handlePopperToggle("clickaway")}
          >
            打开菜单
          </Button>
          <Popper
            visible={activePopper === "clickaway"}
            anchorEl={buttonRefs.current["clickaway"]}
            onClickAway={(e) => {
              // 展示更复杂的 clickaway 处理
              const target = e.target as HTMLElement;
              if (target.closest(".safe-zone")) {
                return; // 不关闭 popper
              }
              setActivePopper(null);
            }}
          >
            <div className="safe-zone">
              <div>这是安全区域，点击不会关闭</div>
              <Button onClick={() => setActivePopper(null)}>手动关闭</Button>
            </div>
          </Popper>
        </div>
      </div>

      {/* Size 预设尺寸 */}
      <h3>Size 预设尺寸</h3>
      <div className={styles.group}>
        {sizeExamples.map(({ id, title, size, content }) => (
          <div key={id} className={styles.demoContainer}>
            <Button
              ref={(el) => (buttonRefs.current[id] = el)}
              onClick={() => handlePopperToggle(id)}
            >
              {title}
            </Button>
            <Popper
              visible={activePopper === id}
              anchorEl={buttonRefs.current[id]}
              size={size}
              arrow
              onClickAway={() => setActivePopper(null)}
            >
              <div className={styles.popperContent}>
                <h4>{title}</h4>
                <p>{content}</p>
              </div>
            </Popper>
          </div>
        ))}
      </div>

      {/* Auto 尺寸内容展示 */}
      <h3>Auto 尺寸内容展示</h3>
      <div className={styles.group}>
        {contentExamples.map(
          ({ id, title, size, multiline, content, width, height }) => (
            <div key={id} className={styles.demoContainer}>
              <Button
                ref={(el) => (buttonRefs.current[id] = el)}
                onClick={() => handlePopperToggle(id)}
              >
                {title}
              </Button>
              <Popper
                visible={activePopper === id}
                anchorEl={buttonRefs.current[id]}
                size={size}
                width={width}
                height={height}
                multiline={multiline}
                arrow
                onClickAway={() => setActivePopper(null)}
              >
                <div className={styles.popperContent}>
                  <h4>{title}</h4>
                  <p>{content}</p>
                </div>
              </Popper>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default PopperSection;
