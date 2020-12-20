// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.23.0
// 	protoc        v3.14.0
// source: timer.proto

package server

import (
	context "context"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// This is a compile-time assertion that a sufficiently up-to-date version
// of the legacy proto package is being used.
const _ = proto.ProtoPackageIsVersion4

type User struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	DisplayName string `protobuf:"bytes,2,opt,name=display_name,json=displayName,proto3" json:"display_name,omitempty"`
}

func (x *User) Reset() {
	*x = User{}
	if protoimpl.UnsafeEnabled {
		mi := &file_timer_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *User) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*User) ProtoMessage() {}

func (x *User) ProtoReflect() protoreflect.Message {
	mi := &file_timer_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use User.ProtoReflect.Descriptor instead.
func (*User) Descriptor() ([]byte, []int) {
	return file_timer_proto_rawDescGZIP(), []int{0}
}

func (x *User) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *User) GetDisplayName() string {
	if x != nil {
		return x.DisplayName
	}
	return ""
}

type Countdown struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Time int64 `protobuf:"varint,1,opt,name=time,proto3" json:"time,omitempty"`
}

func (x *Countdown) Reset() {
	*x = Countdown{}
	if protoimpl.UnsafeEnabled {
		mi := &file_timer_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Countdown) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Countdown) ProtoMessage() {}

func (x *Countdown) ProtoReflect() protoreflect.Message {
	mi := &file_timer_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Countdown.ProtoReflect.Descriptor instead.
func (*Countdown) Descriptor() ([]byte, []int) {
	return file_timer_proto_rawDescGZIP(), []int{1}
}

func (x *Countdown) GetTime() int64 {
	if x != nil {
		return x.Time
	}
	return 0
}

type TimerRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *TimerRequest) Reset() {
	*x = TimerRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_timer_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TimerRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TimerRequest) ProtoMessage() {}

func (x *TimerRequest) ProtoReflect() protoreflect.Message {
	mi := &file_timer_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TimerRequest.ProtoReflect.Descriptor instead.
func (*TimerRequest) Descriptor() ([]byte, []int) {
	return file_timer_proto_rawDescGZIP(), []int{2}
}

type Connection struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	GameId string `protobuf:"bytes,1,opt,name=game_id,json=gameId,proto3" json:"game_id,omitempty"`
	User   *User  `protobuf:"bytes,2,opt,name=user,proto3" json:"user,omitempty"`
	Active bool   `protobuf:"varint,3,opt,name=active,proto3" json:"active,omitempty"`
}

func (x *Connection) Reset() {
	*x = Connection{}
	if protoimpl.UnsafeEnabled {
		mi := &file_timer_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Connection) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Connection) ProtoMessage() {}

func (x *Connection) ProtoReflect() protoreflect.Message {
	mi := &file_timer_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Connection.ProtoReflect.Descriptor instead.
func (*Connection) Descriptor() ([]byte, []int) {
	return file_timer_proto_rawDescGZIP(), []int{3}
}

func (x *Connection) GetGameId() string {
	if x != nil {
		return x.GameId
	}
	return ""
}

func (x *Connection) GetUser() *User {
	if x != nil {
		return x.User
	}
	return nil
}

func (x *Connection) GetActive() bool {
	if x != nil {
		return x.Active
	}
	return false
}

type Message struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *Message) Reset() {
	*x = Message{}
	if protoimpl.UnsafeEnabled {
		mi := &file_timer_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Message) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Message) ProtoMessage() {}

func (x *Message) ProtoReflect() protoreflect.Message {
	mi := &file_timer_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Message.ProtoReflect.Descriptor instead.
func (*Message) Descriptor() ([]byte, []int) {
	return file_timer_proto_rawDescGZIP(), []int{4}
}

var File_timer_proto protoreflect.FileDescriptor

var file_timer_proto_rawDesc = []byte{
	0x0a, 0x0b, 0x74, 0x69, 0x6d, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x18, 0x70,
	0x71, 0x2e, 0x73, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x69, 0x6e, 0x67, 0x2e, 0x67, 0x61, 0x6d, 0x65,
	0x73, 0x2e, 0x74, 0x69, 0x6d, 0x65, 0x72, 0x22, 0x39, 0x0a, 0x04, 0x55, 0x73, 0x65, 0x72, 0x12,
	0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12,
	0x21, 0x0a, 0x0c, 0x64, 0x69, 0x73, 0x70, 0x6c, 0x61, 0x79, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x69, 0x73, 0x70, 0x6c, 0x61, 0x79, 0x4e, 0x61,
	0x6d, 0x65, 0x22, 0x1f, 0x0a, 0x09, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x64, 0x6f, 0x77, 0x6e, 0x12,
	0x12, 0x0a, 0x04, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x04, 0x74,
	0x69, 0x6d, 0x65, 0x22, 0x0e, 0x0a, 0x0c, 0x54, 0x69, 0x6d, 0x65, 0x72, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x22, 0x71, 0x0a, 0x0a, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6f,
	0x6e, 0x12, 0x17, 0x0a, 0x07, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x06, 0x67, 0x61, 0x6d, 0x65, 0x49, 0x64, 0x12, 0x32, 0x0a, 0x04, 0x75, 0x73,
	0x65, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1e, 0x2e, 0x70, 0x71, 0x2e, 0x73, 0x74,
	0x72, 0x65, 0x61, 0x6d, 0x69, 0x6e, 0x67, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x73, 0x2e, 0x74, 0x69,
	0x6d, 0x65, 0x72, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x52, 0x04, 0x75, 0x73, 0x65, 0x72, 0x12, 0x16,
	0x0a, 0x06, 0x61, 0x63, 0x74, 0x69, 0x76, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x08, 0x52, 0x06,
	0x61, 0x63, 0x74, 0x69, 0x76, 0x65, 0x22, 0x09, 0x0a, 0x07, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x32, 0xbe, 0x01, 0x0a, 0x05, 0x54, 0x69, 0x6d, 0x65, 0x72, 0x12, 0x5b, 0x0a, 0x0c, 0x43,
	0x72, 0x65, 0x61, 0x74, 0x65, 0x53, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x12, 0x24, 0x2e, 0x70, 0x71,
	0x2e, 0x73, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x69, 0x6e, 0x67, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x73,
	0x2e, 0x74, 0x69, 0x6d, 0x65, 0x72, 0x2e, 0x43, 0x6f, 0x6e, 0x6e, 0x65, 0x63, 0x74, 0x69, 0x6f,
	0x6e, 0x1a, 0x21, 0x2e, 0x70, 0x71, 0x2e, 0x73, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x69, 0x6e, 0x67,
	0x2e, 0x67, 0x61, 0x6d, 0x65, 0x73, 0x2e, 0x74, 0x69, 0x6d, 0x65, 0x72, 0x2e, 0x4d, 0x65, 0x73,
	0x73, 0x61, 0x67, 0x65, 0x22, 0x00, 0x30, 0x01, 0x12, 0x58, 0x0a, 0x05, 0x53, 0x74, 0x61, 0x72,
	0x74, 0x12, 0x26, 0x2e, 0x70, 0x71, 0x2e, 0x73, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x69, 0x6e, 0x67,
	0x2e, 0x67, 0x61, 0x6d, 0x65, 0x73, 0x2e, 0x74, 0x69, 0x6d, 0x65, 0x72, 0x2e, 0x54, 0x69, 0x6d,
	0x65, 0x72, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x23, 0x2e, 0x70, 0x71, 0x2e, 0x73,
	0x74, 0x72, 0x65, 0x61, 0x6d, 0x69, 0x6e, 0x67, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x73, 0x2e, 0x74,
	0x69, 0x6d, 0x65, 0x72, 0x2e, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x64, 0x6f, 0x77, 0x6e, 0x22, 0x00,
	0x30, 0x01, 0x42, 0x08, 0x5a, 0x06, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x62, 0x06, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_timer_proto_rawDescOnce sync.Once
	file_timer_proto_rawDescData = file_timer_proto_rawDesc
)

func file_timer_proto_rawDescGZIP() []byte {
	file_timer_proto_rawDescOnce.Do(func() {
		file_timer_proto_rawDescData = protoimpl.X.CompressGZIP(file_timer_proto_rawDescData)
	})
	return file_timer_proto_rawDescData
}

var file_timer_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_timer_proto_goTypes = []interface{}{
	(*User)(nil),         // 0: pq.streaming.games.timer.User
	(*Countdown)(nil),    // 1: pq.streaming.games.timer.Countdown
	(*TimerRequest)(nil), // 2: pq.streaming.games.timer.TimerRequest
	(*Connection)(nil),   // 3: pq.streaming.games.timer.Connection
	(*Message)(nil),      // 4: pq.streaming.games.timer.Message
}
var file_timer_proto_depIdxs = []int32{
	0, // 0: pq.streaming.games.timer.Connection.user:type_name -> pq.streaming.games.timer.User
	3, // 1: pq.streaming.games.timer.Timer.CreateStream:input_type -> pq.streaming.games.timer.Connection
	2, // 2: pq.streaming.games.timer.Timer.Start:input_type -> pq.streaming.games.timer.TimerRequest
	4, // 3: pq.streaming.games.timer.Timer.CreateStream:output_type -> pq.streaming.games.timer.Message
	1, // 4: pq.streaming.games.timer.Timer.Start:output_type -> pq.streaming.games.timer.Countdown
	3, // [3:5] is the sub-list for method output_type
	1, // [1:3] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_timer_proto_init() }
func file_timer_proto_init() {
	if File_timer_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_timer_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*User); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_timer_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Countdown); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_timer_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TimerRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_timer_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Connection); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_timer_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Message); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_timer_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_timer_proto_goTypes,
		DependencyIndexes: file_timer_proto_depIdxs,
		MessageInfos:      file_timer_proto_msgTypes,
	}.Build()
	File_timer_proto = out.File
	file_timer_proto_rawDesc = nil
	file_timer_proto_goTypes = nil
	file_timer_proto_depIdxs = nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// TimerClient is the client API for Timer service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type TimerClient interface {
	CreateStream(ctx context.Context, in *Connection, opts ...grpc.CallOption) (Timer_CreateStreamClient, error)
	Start(ctx context.Context, in *TimerRequest, opts ...grpc.CallOption) (Timer_StartClient, error)
}

type timerClient struct {
	cc grpc.ClientConnInterface
}

func NewTimerClient(cc grpc.ClientConnInterface) TimerClient {
	return &timerClient{cc}
}

func (c *timerClient) CreateStream(ctx context.Context, in *Connection, opts ...grpc.CallOption) (Timer_CreateStreamClient, error) {
	stream, err := c.cc.NewStream(ctx, &_Timer_serviceDesc.Streams[0], "/pq.streaming.games.timer.Timer/CreateStream", opts...)
	if err != nil {
		return nil, err
	}
	x := &timerCreateStreamClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type Timer_CreateStreamClient interface {
	Recv() (*Message, error)
	grpc.ClientStream
}

type timerCreateStreamClient struct {
	grpc.ClientStream
}

func (x *timerCreateStreamClient) Recv() (*Message, error) {
	m := new(Message)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *timerClient) Start(ctx context.Context, in *TimerRequest, opts ...grpc.CallOption) (Timer_StartClient, error) {
	stream, err := c.cc.NewStream(ctx, &_Timer_serviceDesc.Streams[1], "/pq.streaming.games.timer.Timer/Start", opts...)
	if err != nil {
		return nil, err
	}
	x := &timerStartClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type Timer_StartClient interface {
	Recv() (*Countdown, error)
	grpc.ClientStream
}

type timerStartClient struct {
	grpc.ClientStream
}

func (x *timerStartClient) Recv() (*Countdown, error) {
	m := new(Countdown)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// TimerServer is the server API for Timer service.
type TimerServer interface {
	CreateStream(*Connection, Timer_CreateStreamServer) error
	Start(*TimerRequest, Timer_StartServer) error
}

// UnimplementedTimerServer can be embedded to have forward compatible implementations.
type UnimplementedTimerServer struct {
}

func (*UnimplementedTimerServer) CreateStream(*Connection, Timer_CreateStreamServer) error {
	return status.Errorf(codes.Unimplemented, "method CreateStream not implemented")
}
func (*UnimplementedTimerServer) Start(*TimerRequest, Timer_StartServer) error {
	return status.Errorf(codes.Unimplemented, "method Start not implemented")
}

func RegisterTimerServer(s *grpc.Server, srv TimerServer) {
	s.RegisterService(&_Timer_serviceDesc, srv)
}

func _Timer_CreateStream_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(Connection)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(TimerServer).CreateStream(m, &timerCreateStreamServer{stream})
}

type Timer_CreateStreamServer interface {
	Send(*Message) error
	grpc.ServerStream
}

type timerCreateStreamServer struct {
	grpc.ServerStream
}

func (x *timerCreateStreamServer) Send(m *Message) error {
	return x.ServerStream.SendMsg(m)
}

func _Timer_Start_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(TimerRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(TimerServer).Start(m, &timerStartServer{stream})
}

type Timer_StartServer interface {
	Send(*Countdown) error
	grpc.ServerStream
}

type timerStartServer struct {
	grpc.ServerStream
}

func (x *timerStartServer) Send(m *Countdown) error {
	return x.ServerStream.SendMsg(m)
}

var _Timer_serviceDesc = grpc.ServiceDesc{
	ServiceName: "pq.streaming.games.timer.Timer",
	HandlerType: (*TimerServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "CreateStream",
			Handler:       _Timer_CreateStream_Handler,
			ServerStreams: true,
		},
		{
			StreamName:    "Start",
			Handler:       _Timer_Start_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "timer.proto",
}
